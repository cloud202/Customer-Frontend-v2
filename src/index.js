import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import Cookies from "js-cookie";
const root = ReactDOM.createRoot(document.getElementById('root'));
const validatetoken = async() =>{
  const url = window.location.href;
  const getTokenFromURL = (url, tokenName) => {
    const params = new URLSearchParams(url.split('#')[1]);
    return params.get(tokenName);
  };
 
  const idToken = getTokenFromURL(url, 'id_token');
  const accessToken = getTokenFromURL(url, 'access_token');
 if(idToken){
  if(idToken!==Cookies.get("token")){
    Cookies.set("token", idToken, {
      expires: 1,
    });
  }
 }
 
  const idTokenVerifier = CognitoJwtVerifier.create({
   userPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
   tokenUse: "id",
   clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  });
  try {
   const idTokenPayload = await idTokenVerifier.verify(Cookies.get("token"));
   console.log("Token is valid. Payload:", idTokenPayload);
   const username = idTokenPayload["cognito:username"];
   Cookies.set("email", idTokenPayload.email, {
    expires: 1,
  });
  Cookies.set("username", username, {
   expires: 1,
 });
} catch {
  console.log("Token not valid!");
  console.log(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`);
  //  window.location.replace(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_API_URL_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`);
  }
 
  
  }
  validatetoken();

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
