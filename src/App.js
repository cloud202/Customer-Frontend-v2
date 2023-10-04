import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import CustomerDashboard from './pages/CustomerDashboard';
import NewProject from './pages/NewProject';
import SelectedProject from './pages/SelectedProject';
import MyProject from './pages/MyProject'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerId } from './features/userData/token';
import { useEffect } from 'react';
import { resetProfileData, setProfileData } from './features/formData/profileForm';
import Task from './pages/Task';

function App() {
  
  const CustomerRoot =()=>{
    console.log(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`)
   window.location.replace(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`);
  //  window.location.replace('https://modx.auth.eu-west-1.amazoncognito.com/login?client_id=21t1tm2h8jhv4elqslgk7mtito&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fuser.modx.cool%2Fuser');
  }

  const userInfo = useSelector((state)=> state.token.userInfo);
  const profileData = useSelector((state)=> state.profileForm.profileData)
  const dispatch = useDispatch();

  async function fetchData(){
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL_CUSTOMER}/api/customer/registration/email/${userInfo.email}`);
      dispatch(setCustomerId(data._id));

      if(data?.customer_role){
        dispatch(setProfileData({field:"customer_role",value: data.customer_role}));
        dispatch(setProfileData({field:"customer_company",value: data.customer_company}));
        dispatch(setProfileData({field:"customer_company_size",value: data.customer_company_size}));
        dispatch(setProfileData({field:"customer_country",value: data.customer_country}));
        dispatch(setProfileData({field:"customer_industry",value: data.customer_industry}));
        dispatch(setProfileData({field:"countryCode",value: data.customer_mobile.countryCode}));
        dispatch(setProfileData({field:"phoneNumber",value: data.customer_mobile.phoneNumber}));
      }

    }catch(e){
      console.log("Error fetching customer Data ",e);
    }
  }
  
  useEffect(() => {
  fetchData();
}, [userInfo.email]);

  
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
           <Route path="/">
           <Route index path="/" element={<CustomerRoot/>}  />
            <Route index path="/user" element={<CustomerDashboard/>}  />
            <Route path="/newproject" element={<NewProject/>}  />
            <Route path="/myproject" element={<MyProject/>}  />
            <Route path="/selectedproject" element={<SelectedProject/>}  />
            <Route path="/task" element={<Task/>}  />
            </Route> 
       </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
