/* eslint linebreak-style: ["error", "windows"] */
const db = require('../config/config');
const Helper = require('./Helper');

exports.createComment = async (req, res) => {
  const { error } = Helper.validateComment(req.body);
  if (error) return res.send({ status: 'error', data: error.details[0].message });
  const { commentbody } = req.body;
  try {
    const { id } = req.user.userData;
    const { rows } = await db.query('INSERT INTO comments(commentbody, userid, postid, posttype) VALUES($1, $2, $3, $4) returning *', [commentbody, id, req.params.postid, 'article']);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: 'An error has occured' });
    return res.status(200).json({ status: 'success', data: { fields: rows[0], message: 'comment created successfully' } });
  } catch (err) {
    return res.status(400).json({ status: 'error', data: err });
  }
};
exports.getComments = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT c.commentid, c.commentbody, c.createdat, concat(u.firstname, \' \', u.lastname) as commentby from comments c LEFT JOIN users u ON c.userid = u.id WHERE c.postid=$1 and c.posttype=$2', [req.params.postid, 'article']);
    if (!rows[0]) return res.send({ status: 'error', data: 'No comments were found' });
    return res.status(201).json({ status: 'success', data: rows });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};
exports.deleteComment = async (req, res) => {
  // verify article owner
  try {
    const { rows } = await db.query('select FROM comments WHERE commentid=$1 and posttype=$2 and userid=$3', [req.params.commentid, 'article', req.user.userData.id]);
    if (!rows[0]) return res.status(201).json({ status: 'error', data: { message: 'no such comment' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: 'could not delete user' });
  }
  try {
    const { rows } = await db.query('DELETE FROM comments WHERE commentid=$1 and posttype=$2 and userid=$3 returning *', [req.params.commentid, 'article', req.user.userData.id]);
    return res.status(201).json({ status: 'success', data: { user: rows, message: 'comment deleted successfully' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: 'could not delete user' });
  }
};
exports.updateComment = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT userid FROM comments WHERE userid=$1 AND posttype=$2 AND commentid=$3', [req.user.userData.id, 'article', req.params.commentid]);
    if (!rows[0]) return res.send({ status: 'error', data: { message: 'You are not authorized to edit this article' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: { message: 'an error occured', error } });
  }
  try {
    const { rows } = await db.query('UPDATE comments SET commentbody=$1 WHERE commentid=$2 and posttype=$3 returning *', [req.body.commentbody, req.params.commentid, 'article']);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: { message: 'An error occured' } });
    return res.status(201).json({ status: 'success', data:{ comment: rows[0], message: 'comment updated successfully' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};
