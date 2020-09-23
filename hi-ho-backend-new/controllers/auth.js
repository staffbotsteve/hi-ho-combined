const User = require("../models/User");
const { tokenGenerator } = require("../middleware/auth");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const userDetails = req.body;
  User.create(userDetails, (err, data) => {
    if (err) {
      res.json({ err: "Email already exists" })
    } else {
      tokenGenerator(data, (err, token) => {
        if (err) {
          res.json({ err: "Unable to generate token" });
        } else {
          res.status(201).json({
            data,
            token,
            success: true,
          });
        }
      });
    }
  });
  
};

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide an email and password",
      });
    }

    // check for user
    const user = await User.findOne({ email }).select("+password");

    // Validate email & password
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // create token
    if (user) {
      tokenGenerator(user, (err, token) => {
        if (err) {
          res.json({ err: "unable to generate token" });
        } else {
          res.status(201).json({
            data: user,
            token,
            success: true,
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    GET current logged in User
// @route   GET /api/v1/auth/me
// @access  Private

exports.getMe = (req, res) => {
  const id = req.params.id;
  if (req.decoded.id == id) {
    User.findById(id, (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: "user doesn't exist",
        });
      } else {
        res.status(200).json({
          success: true,
          data,
        });
      }
    });
  } else {
    res.json({ error: "You cannot fetch profile for another user" });
  }
};

exports.updateMe = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "Sorry, cannot process update at this time",
      });
    } else {
      res.status(200).json({
        success: true,
        result,
      });
    }
  });
};
