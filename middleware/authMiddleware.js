const jwt =require('jsonwebtoken');
require('dotenv').config();

const authenticattoken = (req, res, next) => {

  const authhead = req.headers['authorization'];
  const token = authhead&&authhead.split(' ')[1];

  //
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'not vaild' });
    req.user = user;
    next();
  });
};

const authorized = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'error' });
  }
  next();
};

module.exports = { authenticattoken, authorized };
