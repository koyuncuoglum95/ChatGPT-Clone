import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new UserModel({ ...req.body, password: hashedPassword });
        await newUser.save();

        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const signin = async (req, res) => {
    try {
        const oldUser = await UserModel.findOne({ email: req.body.email });
        !oldUser && res.status(404).json('User not found');

        const isPassword = await bcrypt.compare(req.body.password, oldUser.password);
        !isPassword && res.status(403).json("Invalid Credentials!");

        const token = jwt.sign({ id: oldUser._id}, process.env.JWT_KEY, {expiresIn: "5d"});
        const { password, ...others } = oldUser._doc;

        res.status(200).json({ ...others, token });
    } catch (error) {
        res.status(500).json(error);
    }
};


export const googleSignin = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email, fromGoogle: true });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        res.status(200).json({ ...user._doc, token });
      } else {
        const newUser = new UserModel({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        res.status(200).json({ ...savedUser._doc, token });
      }
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  };


  export const githubSignin = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email, fromGithub: true });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        res.status(200).json({ ...user._doc, token });
      } else {
        const newUser = new UserModel({
          ...req.body,
          fromGithub: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        res.status(200).json({ ...savedUser._doc, token });
      }
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  };
  

  export const twitterSignin = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email, fromTwitter: true });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        res.status(200).json({ ...user._doc, token });
      } else {
        const newUser = new UserModel({
          ...req.body,
          fromTwitter: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY, { expiresIn: '5d' });
        res.status(200).json({ ...savedUser._doc, token });
      }
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  };