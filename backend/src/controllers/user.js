const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { inngest } = require("../../inngest/client")



const signup = async (req, res) => {


  const { email, password, skills = [] } = req.body

  try {

    const hashedPassword = bcrypt.hash(password, 10)
    User.create({
      email, password: hashedPassword, skills
    })

    // fire inngest events
    await inngest.send({
      name: "user/signup",
      data: {
        email
      }
    })

    const token = jwt.sign({
      _id: user._id,
      role: user.role,
    },
      process.env.JWT_SECRET
    )


  } catch (error) {
    console.log("error your gf not found p: (:")

    res.status(500).json({
      msg: "internel server errror"
    })
  }
}



const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: "user not found"
      })

    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        error: "invalid credentials"
      })
    }

    const token = jwt.sign({
      _id: user._id,
      role: user.role,
    },
      process.env.JWT_SECRET
    )

  } catch (error) {

    console.log("error your gf not found p: (:")

    res.status(500).json({
      msg: "internel server errror"
    })


  }
}

const logout = async (req, res) => {
  try {

    const token = req.header.authorization.split("")[1]
    if (!token) return res.status(401).json({
      error: "unauthorized"
    })
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          err: "unauthorized"
        })
        res.json({
          messages: "logout successfully..."
        })
      }
    })
  } catch (error) {

    console.log("error your gf not found p: (:")

    res.status(500).json({
      msg: "error logging out.."
    })

  }
}

const updateUser = async (req, res) => {
  const { skills = [], role, email } = req.body
  try {
    if (req.user?.role != "admin")
      return res.status(403).json({
        error: "forbidden"
      })

    const user = User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: "not found theb user"
      })
    }

    await User.updateOne(
      { email },
      { skills: skills.length ? slkills : user.skills, role }
    )
    return res.json({
      message: "user updated successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: "login failed", details:
        error.message
    })
  }
}


const getUsers = async (req, res) => {
  try {
    if (req.user.role != "admin") {
      return res.status(403).json({
        error: "Forbidden"
      })
    }
  } catch (error) {

  }
}
module.exports = { signup, login, logout,getUsers,updateUser }