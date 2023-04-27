import express from 'express';
import { createOpenAI, deleteOpenAI, getAllOpenAI, getOneOpenAI, updateOpenAI } from '../controllers/OpenAI.js';
import { verifyToken } from '../middleware/verifyToken.js'


const router = express.Router();

// Create Chat
router.post('/chatGPT', verifyToken, createOpenAI);

// Retrieve Chat
router.get('/chatGPT/find/:id', getOneOpenAI);

// List All Chat
router.get('/chatGPT/all', getAllOpenAI);

// Update Chat
router.put('/chatGPT/:id', verifyToken, updateOpenAI);

// Delete Chat
router.delete('/chatGPT/:id', verifyToken, deleteOpenAI);

export default router;