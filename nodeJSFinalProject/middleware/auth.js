const jwt = require('jsonwebtoken'); //bring a library of json web token (creates the token)
const config = require('config'); //bring a library of config
   


//verifying the authentication of the user (with the token which was created at the routes/auth)
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
 
  try {
    const decoded = jwt.verify(token, config.get('jwtKey'));
    req.user = decoded;
    next();
  }
  catch (error) {
    res.status(400).send('Invalid token.');
  }
}