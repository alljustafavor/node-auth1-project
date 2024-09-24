const Users = require('../users/users-model');

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next({ status: 401, message: 'You shall not pass!'});
  } 
}

async function checkUsernameFree(req, res, next) {
  const users = await Users.findBy({ username: req.body.username });
  if (users.length === 0) {
    next();
  } else {
    next({ status: 422, message: 'Username taken'});
  }
}

async function checkUsernameExists(req, res, next) {
  const users = await Users.findBy({ username: req.body.username });
  if (users.length > 0) {
    next();
  } else {
    next({ status: 401, message: 'Invalid credentials'});
  }
}

function checkPasswordLength(req, res, next) {
  if (req.body.password && req.body.password.length > 3) {
    next();
  } else {
    next({ status: 422, message: 'Password must be longer than 3 chars'});
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
