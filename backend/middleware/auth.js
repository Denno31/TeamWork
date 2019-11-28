/* eslint linebreak-style: ["error", "windows"] */
const jwt = require('jsonwebtoken');
const db = require('../config/config');

const auth = {
  async verifyToken (req, res, next) {
    // const token = req.header('auth-token');
    // if (!token) return res.status(200).json({ status: 'error', data: 'Access denied' });
    // try {
    //   const decodedToken = await jwt.verify(token, process.env.SECRET);
    //   const textQuery = 'SELECT id from users WHERE id= $1';
    //   const { rows } = await db.query(textQuery, [decodedToken.userId.id]);
    //   if (!rows[0]) return res.status(200).json({ status: 'error', data: 'invalid token' });
    //   req.user = { userData: decodedToken.userId };
    //   next();
    // } catch (error) {
    //   return res.status(400).json({ status: 'error', data: error });
    // }

    const authHeader = req.headers['authorization'];

	if (typeof authHeader !== 'undefined') {
		//split token and bearer into bearer array 
		const bearer = authHeader.split(' ');

		//set token
		const token = bearer[1];

		//verify the auth user
    try {
        const decodedToken = await jwt.verify(token, process.env.SECRET);
        const textQuery = 'SELECT id from users WHERE id= $1';
        const { rows } = await db.query(textQuery, [decodedToken.userId.id]);
        if (!rows[0]) return res.status(200).json({ status: 'error', data: 'invalid token' });
        req.user = { userData: decodedToken.userId };
        next();
      } catch (error) {
        return res.status(400).json({ status: 'error', data: error });
      }
  
	} else {
		return res.status(401).json({
			status: 'error',
			error: 'unauthenticated'
		});
	}
  },
  async verifyTokenIsAdmin (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(400).json({ status: 'error', data: 'Access denied' });
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET);
      const textQuery = 'SELECT id, role from users WHERE id= $1 and role= $2';
      const { rows } = await db.query(textQuery, [decodedToken.userId.id, 'admin']);
      if (!rows[0]) return res.status(400).json({ status: 'error', data: 'You are not authorised!' });
      // req.user = { userData: decodedToken.userId };
      next();
    } catch (error) {
      return res.status(400).json({ status: 'error', data: error });
    }

  }, 
  async authorizeOwner (req, res) {
    try {
      const { id } = req.user.userData
      const textQuery = 'SELECT id, role from users WHERE id= $1 or role= $2';
      const { rows } = await db.query(textQuery, [id, 'admin']);
      if (!rows[0]) return false
      return true;
    }catch(error){
    return false;
  }
}
};
module.exports = auth;
