import mongoose from 'mongoose';

const chatCompletionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  openaiId: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  choices: [{
    message: {
      role: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    },
    finish_reason: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }],
  userPrompt: { // Added field to store user's prompt
    type: String,
    required: true
  }
  // Add any other fields that you need here
}, { timestamps: true });

const ChatCompletion = mongoose.model('ChatCompletion', chatCompletionSchema);

export default ChatCompletion;

