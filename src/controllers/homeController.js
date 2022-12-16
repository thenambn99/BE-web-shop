import db from "../models/index"

export const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll()
    console.log(data);
    return res.send('hello')
  } catch (err) {
    console.log(err);
  }
  // return res.send("hello abc")
}
