const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {


    const token = req.headers.authorization.split("")[1]

    if (!token) {
      return res.status(401).json({
        error: "access deneied no turn toekn found.."
      })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
    } catch (error) {
      res.status(401).json({
        error: "invalid token "
      })
    }



  } catch (error) {

  }
};

module.exports = authMiddleware;
