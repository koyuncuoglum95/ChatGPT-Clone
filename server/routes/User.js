import express from 'express';
import { updatedUser, deletedUser, getUser, getAllUser } from '../controllers/User.js';
import { verifyToken } from '../middleware/verifyToken.js'


const router = express.Router();


// Update User 
router.put('/:id', verifyToken, updatedUser);

//  Delete User
router.delete('/:id', verifyToken, deletedUser);

// Retrieve User
router.get('find/:id', getUser);

// List Users
router.get('/users', getAllUser);

export default router;

