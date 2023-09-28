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

function App() {
  
  const CustomerRoot =()=>{
    console.log(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`)
   window.location.replace(`${process.env.REACT_APP_COGNITO}login?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`);
  //  window.location.replace('https://modx.auth.eu-west-1.amazoncognito.com/login?client_id=21t1tm2h8jhv4elqslgk7mtito&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fuser.modx.cool%2Fuser');
  }
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
            </Route> 
       </Routes>
     </BrowserRouter> 
    </div>
  );
}

export default App;
