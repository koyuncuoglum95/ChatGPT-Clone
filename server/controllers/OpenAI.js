import axios from 'axios';
import chatCompletion from '../models/OpenAI.js';
import UserModel from '../models/User.js';


export const createOpenAI = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const user = await UserModel.findOne({ _id: req.body.id });

    if (!user) {
      console.error('User not found:', req.body.id);
      return res.status(404).send('User not found');
    }

    console.log('User found:', user);

    const { content } = req.body;
    let data = JSON.stringify({
      "model": process.env.MODEL,
      "messages": [
        {
          "role": "user",
          "content": content
        }
      ]
    });

    const options = {
      method: 'POST',
      url: `https://${process.env.OPENAI_HOST}/chat/completions`,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.OPENAI_API_KEY,
        'X-RapidAPI-Host': process.env.OPENAI_HOST,
      },
      data,
    };

    axios.request(options)
      .then(async function (response) {
        console.log('OpenAI API response:', response.data);
        const chat = new chatCompletion({
          userId: user._id,
          openaiId: response.data.id,
          model: response.data.model,
          choices: response.data.choices,
          userPrompt: content,
        });
        await chat.save();
        res.status(200).json(chat);
      })
      .catch(function (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error calling OpenAI API');
      });
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).send('Internal server error');
  }
};

export const getAllOpenAI = async (req, res) => {
    try {
        const chat = await chatCompletion.find();
        res.status(200).json(chat);
      } catch (err) {
        res.status(500).send('Internal server error');
      }
};

export const getOneOpenAI = async (req, res) => {
    try {
        const chat = await chatCompletion.findById(req.params.id);
        res.status(200).json(chat);
      } catch (err) {
        res.status(500).send('Internal server error');
      }
};

export const updateOpenAI = async (req, res) => {
  if (req.params.id !== req.user.id) {
    try {
      const updatedOpenAI = await chatCompletion.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedOpenAI);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
  else {
    return res.status(403).json("You can only update your account chatGPT");
  }
};

export const deleteOpenAI = async (req, res) => {
  if (req.params.id !== req.user.id) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);

      res.status(200).json("ChatGPT has been deleted");
      
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
  else {
    return res.status(403).json("You can only delete your account chatGPT");
  }
}