const Account = require("../model/account.model");
const mongoose=require('mongoose')
const register = async (req, res) => {
  //username, email, password
  try {
    const validAccount=await Account.findOne({email:req.body.email})

    if(validAccount){
        return res.status(404).json({message:"email exited!"})
    }
    const account = new Account({
        _id:new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await account.save();
    return res.status(200).json({ message: "register success", data: account });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports={
    register
}
