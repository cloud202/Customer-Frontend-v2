import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider, useDispatch, useSelector } from 'react-redux'; // Removed useSelector as it's not used
import { store } from './store/store';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import Cookies from "js-cookie";
import { resetCustomerId, setIdToken, setUserInfo } from './features/userData/token';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { setProfileData } from './features/formData/profileForm';

const MyComponent = () => {
  const dispatch = useDispatch();
  const idTokenRedux = useSelector((state)=> state.token.idToken);
  dispatch(resetCustomerId());

  const validateToken = async () => {
    const url = window.location.href;
    
    const getTokenFromURL = (url, tokenName) => {
      const params = new URLSearchParams(url.split('#')[1]);
      return params.get(tokenName);
    };
    
    const idToken = getTokenFromURL(url, 'id_token');
    const accessToken = getTokenFromURL(url, 'access_token');
    
    if (idToken) {
      if (idToken !== Cookies.get("token")) {
        Cookies.set("token", idToken, {
          expires: 1,
        });
      }
      dispatch(setIdToken(idToken));
    }
    
    const idTokenVerifier = CognitoJwtVerifier.create({
      userPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
      tokenUse: "id",
      clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    });
    
    try {
        const idTokenPayload = await idTokenVerifier.verify(idTokenRedux);
        console.log("Cognito Data",idTokenPayload)
        console.log("Token is valid. Payload:", idTokenPayload);
        const username = idTokenPayload["cognito:username"];

        // Cookies.set("email", idTokenPayload.email, {
        //     expires: 1,
        // });
        // Cookies.set("username", username, {
        //     expires: 1,
        // });

      dispatch(setUserInfo({value1: idTokenPayload.email, value2: username}));
      dispatch(setProfileData({field:"customer_name",value: username}));
      dispatch(setProfileData({field:"customer_email",value: idTokenPayload.email}));
      // dispatch(setUserInfo({field: "userName",value: username}));

    } catch {
      console.log("Token not valid!");
      console.log(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`);
      // window.location.replace(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_API_URL_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`);
    }
  };

  useEffect(() => {
    validateToken();
  }, [idTokenRedux]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
};

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}> {/* Ensure Provider wraps the entire component tree */}
    <PersistGate persistor={persistor}>
      <MyComponent />
    </PersistGate>
    </Provider>
  );

reportWebVitals();
