import jwt from "jsonwebtoken"
require("dotenv").config();

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]
  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
    next();
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
      success: false
    })
  }
}

export const refreshToken = (req, res, next) => {
  const id = req.body.id
  const refreshToken = jwt.sign({user_id: Number(id)}, process.env.SECRET_KEY, {expiresIn: '8h'})
  return res.status(200).json({
    refreshToken: refreshToken
  })
}