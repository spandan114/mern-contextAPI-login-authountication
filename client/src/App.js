import React,{useEffect,useContext} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Loginpage from './pages/loginpage' 
import Registerpage from './pages/registerpage' 
import Navbarcomponent from './components/navbarcomponent'
import AuthContextProvider from './contexts/AuthContext'
import { AuthContext } from './contexts/AuthContext'
// import {useHistory} from 'react-router-dom'
import Homepage from './pages/homepage';
import Forhotpassword from './pages/Forhotpassword';
import ResetPassword from './pages/ResetPassword';

const Routing = ()=>{

  const {state,dispatch} = useContext(AuthContext)
  // const history = useHistory()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
  },[])

  return(
 
    <Switch>

        <Route exact path="/" >
      <Homepage/>
      </Route>
      
        <Route exact path="/login" >
      <Loginpage/>
      </Route>

      <Route exact path="/register" >
      <Registerpage/>
      </Route>

      <Route exact path="/Forhotpassword" >
      <Forhotpassword/>
      </Route>

      <Route exact path="/reset/:token" >
      <ResetPassword/>
      </Route>
      
    </Switch>
  )
}

function App() {
  return (
    
    <AuthContextProvider>
      <BrowserRouter>
      <Navbarcomponent/>
      <Routing />
    </BrowserRouter>
    </AuthContextProvider>

  );
}

export default App;
