/* eslint linebreak-style: ["error", "windows"] */
const db = require('../config/config');
const Helper = require('./Helper');
const auth = require('../middleware/auth');

exports.createGif = async (req, res) => {
  const { error } = Helper.validateGif(req.body);
  if (error) return res.send({ status: 'error', data: error.details[0].message });
  try {
    const { title, gifurl } = req.body;
    const { id } = req.user.userData;
    const { rows } = await db.query('INSERT INTO gifs(giftitle, gifurl, authorid) VALUES($1, $2, $3) returning *', [title, gifurl, id]);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: { message: 'An error has occured' } });
    return res.status(200).json({ status: 'success', data: rows[0] });
  } catch (err) {
    return res.status(400).json({ status: 'error', data: err });
  }
};
exports.getGifs = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT gifs.gifid, gifs.giftitle, gifs.gifurl, gifs.authorid, gifs.createdat,concat(users.firstname,\' \', users.lastname) as author FROM gifs left join users on gifs.authorid = users.id', []);
    if (!rows[0]) return res.send({ status: 'error', data: 'No gifs were found' });
    return res.status(201).json({ status: 'success', data: rows });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};
exports.getSingleGif = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT gifs.gifid, gifs.giftitle, gifs.gifurl, gifs.authorid, gifs.createdat,concat(users.firstname,\' \', users.lastname) as author FROM gifs left join users on gifs.authorid = users.id where gifid=$1', [req.params.id]);
    if (!rows[0]) return res.send({ status: 'error', data: 'No gifs was found' });
    return res.status(201).json({ status: 'success', data: rows });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};
exports.deleteGif = async (req, res) => {
  // verify article owner
  if (auth.authorizeOwner === false) return res.status(400).json('You are not able to delete this post');
 
  try {
    const rows = await db.query('DELETE FROM gifs WHERE gifid=$1 returning *', [req.params.id]);
    return res.status(201).json({ status: 'success', data: { user: rows[0], message: 'gif deleted successfully' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: 'could not delete gif' });
  }
};
exports.updateGif = async (req, res) => {
// verify article owner
 if (auth.authorizeOwner === false) return res.status(400).json({ status: 'error',data: { message: 'you cannot update this post' } })
  // update article
  const { error } = Helper.validateGif();
  if (error) return res.send({ status: 'error', data: error.details[0].message });
  try {
    const { rows } = await db.query('UPDATE gifs SET giftitle=$1, gifurl=$2 WHERE gifid=$3 returning *', [req.body.title, req.body.gifurl, req.params.id]);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: { message: 'the post does not exist' } });
    return res.status(201).json({ status: 'success', data:{ gif: rows[0], message: 'gif updated successfully' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};

