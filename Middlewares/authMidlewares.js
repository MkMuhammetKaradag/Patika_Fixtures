const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const ISLOGGED = await User.findById(req.session.userID);

    if (!ISLOGGED) return res.status(401).redirect('/login');
    res.user = ISLOGGED;
    next();
  } catch (error) {
    return res.status(500).send('Bir hata oluştu');
  }
};
