module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    console.log(res.user);
    console.log(req.body);
    if (roles.includes(res.user.role)) {
      next();
    } else return res.status(401).send('Buna yetkiniz yok.');
  };
};
