import UserModel from '../models/User.js';

export const updatedUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

      console.log(req.user.id)
      console.log(req.params.id)


      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  else {
    return res.status(403).json("You can only update your account!");
  }
};


export const deletedUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    await UserModel.findByIdAndDelete(req.params.id);

    
    console.log(req.user.id)
    console.log(req.params.id)


    res.status(200).json("User has been deleted!");
  }
  else {
    return res.status(403).json("You can only delete your account!");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


