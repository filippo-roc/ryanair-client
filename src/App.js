import { useState, useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router';

import { useHistory } from 'react-router-dom'
import React from "react"
//pages
import Spinner from './components/UI/Spinner'
import Layout from './components/Layouts/Layout';
import Home from "./pages/Home";
import SignIn from "./components/SignIn/SignIn"
import Login from "./components/Login/Login"
import Summary from './pages/Summary';
import { useDispatch } from "react-redux";
import authACTIONS from "./store/actions/auth"

const Flights = React.lazy(() => import("./pages/Flights"));
const Bags = React.lazy(() => import("./pages/Bags"));
const Bookings = React.lazy(() => import("./pages/Bookings"));
const Passengers = React.lazy(() => import("./pages/Passengers"));
const NotFound = React.lazy(()=>import("./pages/NotFound"))
const User = React.lazy(()=>import("./pages/User"))


function App() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState("");
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));

    // if the user has already logged in, recover the data
    if(user){
      dispatch({ type: authACTIONS.LOGIN, user: {...user}});
    }

  },[dispatch])
  
  // url change handler
  const history = useHistory() 

  useEffect(() => {
     return history.listen((location) => { 
      window.scrollTo(0,0)
     }) 
  },[history]) 
  
  const handleTabClose =function(event){
    event.preventDefault();
    return (event.returnValue = 'Are you sure you want to exit?');
  };

  useEffect(() => {
    // tab close handler

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };// eslint-disable-next-line
  }, []);


  return (
    <div className="App">
      <Layout setModal={setModal}>
        <Suspense fallback ={<div className='spinner-container'><Spinner className='spinner'/></div>}>
          
        {(modal === "sign-in") && <SignIn setModal={setModal} />}
        {(modal === "login") && <Login setModal={setModal} />}
        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/user" exact>
            <User />
          </Route>

          <Route path="/user/booking" exact>
            <Bookings />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/home/flights/select" exact >
            <Flights />
          </Route>

          <Route path={`/home/flights/passengers`} exact>
            <Passengers />
          </Route>

          <Route path="/home/flights/bags" exact>
            <Bags />
          </Route>

          <Route path="/home/summary" exact>
            <Summary />
          </Route>


          <Route path='*'>
            <NotFound />
          </Route>


        </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;



// / home / cart