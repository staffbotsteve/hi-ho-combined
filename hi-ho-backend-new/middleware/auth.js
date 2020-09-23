const jwt = require('jsonwebtoken');

//secret key used in the encoding process. Can be anything

//using jwt to endcode user information and returning it back as a token so they use it to make requests
module.exports.tokenGenerator = (user, callback) => {
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    (err, res) => {
      callback(err, res);
    }
  );
};

//endpoint to decode token provided by the user and check if to authorize the request or not
module.exports.authorizeUser = (req, res, next) => {
  const token =
    req.headers.authorization ||
    req.headers["x-access-token"] ||
    req.body.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.send(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      status: "Failed",
      message: "Authentication required for this route"
    });
  }
};
