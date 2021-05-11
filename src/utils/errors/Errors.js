const RequiredAuthError = () => {
  const err = new Error('Требуется авторизация!');
    err.statusCode = 400;
    return err;
}

const ErrorExistedEmail = (message) => {
  const err = new Error(message);
  err.status = 400;
  return err;
};

const ErrorEmailPassword = (message) => {
  const err = new Error(message);
  err.status = 401;
  return err;
};

module.exports = { RequiredAuthError, ErrorEmailPassword, ErrorExistedEmail };
