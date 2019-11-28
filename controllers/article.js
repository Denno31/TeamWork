/* eslint linebreak-style: ["error", "windows"] */
const db = require('../config/config');
const Helper = require('./Helper');

exports.createArticle = async (req, res) => {
  const { error } = Helper.validateArticle(req.body);
  if (error) return res.send({ status: 'error', data: error.details[0].message });
  const { title, body } = req.body;
  try {
    const { id } = req.user.userData;
    const { rows } = await db.query('INSERT INTO articles(title, body, createdby) VALUES($1, $2, $3) returning *', [title, body, id]);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: 'An error has occured' });
    return res.status(200).json({ status: 'success', data: rows[0] });
  } catch (err) {
    return res.status(400).json({ status: 'error', data: err });
  }
};
exports.getAllArticles = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT articles.id, articles.title, articles.body, articles.createdby, articles.createdon,users.email, concat(users.firstname,\' \', users.lastname) FROM articles left join users on articles.createdby = users.id', []);
    if (!rows[0]) return res.send({ status: 'error', data: 'No articles were found' });
    return res.status(201).json({ status: 'success', data: rows });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};
exports.deleteArticle = async (req, res) => {
  // verify article owner
  try {
    const { rows } = await db.query('SELECT id FROM articles WHERE id=$1 AND createdby=$2', [req.params.id, req.user.userData.id]);
    if (!rows[0] || !req.user.userData.role === 'admin') return res.send({ status: 'error', data: 'You are not authorized to delete this article' });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
  // delete article
  try {
    const rows = await db.query('DELETE FROM articles WHERE id=$1 returning *', [req.params.id]);
    return res.status(201).json({ status: 'success', data: { users: rows[0], message: 'article deleted successfully' } });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: 'could not delete user' });
  }
};
exports.updateArticle = async (req, res) => {
// verify article owner
  try {
    const { rows } = await db.query('SELECT id FROM articles WHERE id=$1 AND createdby=$2', [req.params.id, req.user.userData.id]);
    if (!rows[0]) return res.send({ status: 'error', data: 'You are not authorized to edit this article' });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
  // update article
  try {
    const { rows } = await db.query('UPDATE articles SET title=$1, body=$2 WHERE id=$3 returning *', [req.body.title, req.body.body, req.params.id]);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: 'An error occured' });
    return res.status(201).json({ status: 'success', data: rows[0] });
  } catch (error) {
    return res.status(400).json({ status: 'error', data: error });
  }
};
exports.singleArticle = async (req, res) => {
  const { error } = Helper.validateArticle(req.body);
  if (error) return res.send({ status: 'error', data: error.details[0].message });
  try {
    const { rows } = await db.query('SELECT articles.id, articles.title, articles.body, articles.createdby, articles.createdon,users.email, concat(users.firstname,\' \', users.lastname) as name FROM articles left join users on articles.createdby = users.id WHERE articles.id=$1', [req.params.id]);
    if (!rows[0]) return res.status(400).json({ status: 'error', data: 'article not found' });
    return res.status(201).json({ status: 'success', data: rows[0] });
  } catch (err) {
    return res.status(400).json({ status: 'error', data: err });
  }
};
