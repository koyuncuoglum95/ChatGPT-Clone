import axios from "axios";
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/userSlice';
import { chatStart, chatSuccess, chatFailure, chatLogout } from '../redux/chatSlice';
import { auth, googleProvider, githubProvider, twitterProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const API = axios.create({
  baseURL: "http://localhost:5000"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('persist:root')) {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser?.token;

    req.headers.Authorization = `Bearer ${TOKEN}`;
  }

  return req;
});


export const signup = async (dispatch, userData, navigate) => {
  dispatch(loginStart());
  try {
    const res = await API.post('/signup', userData);
    dispatch(loginSuccess(res.data));
    navigate('/signin');
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const signin = async (dispatch, userData, navigate) => {
  dispatch(loginStart());
  try {
    const res = await API.post('/signin', userData);
    dispatch(loginSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const Logout = async (dispatch, navigate) => {
  dispatch(logout());
  navigate('/signin');
};

export const fetchChat = async (dispatch, newChat, setChatData, chatData) => {
  dispatch(chatStart());
  try {
    const res = await API.post('/chatGPT', newChat);
    setChatData([...chatData, res.data]);
    dispatch(chatSuccess(res.data));
  } catch (error) {
    dispatch(chatFailure());
  }
};

export const allChat = async (setHistory) => {
  try {
    const res = await API.get('/chatGPT/all');
    setHistory(res.data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

export const oneChat = async (id) => {
  try {
    const res = await API.get(`chatGPT/find/${id}`);
    return res.data; // Return the data instead of calling setDetails
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null; // Return null in case of an error
  }
};


export const resetChat = async (dispatch, navigate) => {
  dispatch(chatLogout());
  navigate('/');
}

export const googleSignin = async (dispatch, navigate) => {
  dispatch(loginStart());
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      API.post('/google/signin', {
        fullname: result.user.displayName,
        email: result.user.email,
        imageUrl: result.user.photoURL,
        fromGoogle: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess(res.data));
        navigate('/');
      });
    })
    .catch((error) => {
      dispatch(loginFailure());
    })
};

export const githubSignin = async (dispatch, navigate) => {
  dispatch(loginStart());
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      API.post('/github/signin', {
        fullname: result.user.displayName,
        email: result.user.email,
        imageUrl: result.user.photoURL,
        fromGithub: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess(res.data));
        navigate('/');
      });
    })
    .catch((error) => {
      dispatch(loginFailure());
    })
};

export const twitterSignin = async (dispatch, navigate) => {
  dispatch(loginStart());
  signInWithPopup(auth, twitterProvider)
    .then((result) => {
      API.post('/twitter/signin', {
        fullname: result.user.displayName,
        email: result.user.email,
        imageUrl: result.user.photoURL,
        fromTwitter: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess(res.data));
        navigate('/');
      });
    })
    .catch((error) => {
      dispatch(loginFailure());
    })
};