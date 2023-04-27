import express from 'express';
import { signin, signup, googleSignin, githubSignin, twitterSignin } from '../controllers/Auth.js'

const router = express.Router();

// Signin 
router.post('/signin', signin);

// Signup
router.post('/signup', signup);


// Add this line for the new Google Sign-in route
router.post('/google/signin', googleSignin); 

// Add this line for the new Google Sign-in route
router.post('/github/signin', githubSignin); 

// Add this line for the new Google Sign-in route
router.post('/twitter/signin', twitterSignin); 


export default router;
