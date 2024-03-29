const User = require('../models/user');

exports.form = (req, res) => {
  res.render('register', { title: 'Регистрация' });
};

exports.submit = (req, res, next) => {
  var data = req.body.user;
  console.log('Пользователь:', req.body.user);
  User.getByName(data.name, (err, user) => {
    if (err) return next(err);

    if (user.id) {
      res.error('Пользователь уже существует!');
      res.redirect('back');
    } else {
      user = new User({
        name: data.name,
        pass: data.pass,
        testField: data.testField
      });
      user.save((err) => {
        if (err) return next(err);
        req.session.uid = user.id;
        res.redirect('/')
      });
    }
  });
};
