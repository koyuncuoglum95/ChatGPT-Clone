import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup, googleSignin, twitterSignin, githubSignin } from '../../api/index';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaTwitter } from 'react-icons/fa';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: black;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: green;
  color: white;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: white;
`;

const Links = styled.div`
  margin-left: 50px;
  color: white;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Signin = () => {

  const dispatch = useDispatch();

  const [ email, setEmail] = useState("");
  const [ fullname, setFullname ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ imageUrl, setImageUrl ] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      fullname: fullname,
      password: password,
      imageUrl: imageUrl
    };
    signup(dispatch, newUser, navigate);
  };


  const handleSignin = (e) => {
    e.preventDefault();
    const oldUser = {
      email: email,
      password: password
    };
    signin(dispatch, oldUser, navigate);
  };

  const signInWithGoogle = async () => {
    googleSignin(dispatch, navigate);
  }

  const signInWithGithub = async () => {
    githubSignin(dispatch, navigate);
  };

  const signInWithTwitter = async () => {
    twitterSignin(dispatch, navigate);
  };

  return (
    <Container>
      <Wrapper>

        <Title>Sign in</Title>
        <SubTitle>to continue to MehmetGPT</SubTitle>

        <Input
          type='email'
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignin}>Sign in</Button>
        <FcGoogle onClick={signInWithGoogle} style={{fontSize: '35px', cursor: 'pointer', marginLeft: '-10rem'}}>Signin with Google</FcGoogle>
        <FaGithub onClick={signInWithGithub} style={{ fontSize: '35px', cursor: 'pointer', marginTop: '-44px'}}>Signin with Github</FaGithub>
        <FaTwitter onClick={signInWithTwitter} style={{ color: '#00acee', fontSize: '35px', cursor: 'pointer', marginLeft: '10rem', marginTop: '-45px'}}>Signin with Twitter</FaTwitter>

        <Title>Signup</Title>

        <Input
          type='email'
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input
          type='text'
          placeholder="fullname"
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input 
          type='text'
          placeholder="profile url" 
          onChange={(e) => setImageUrl(e.target.value)}
          />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default Signin