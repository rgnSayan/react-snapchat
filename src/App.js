import React, { useEffect } from 'react';
import WebCamCapture from './Components/WebCamCapture'
import Preview from './Components/Preview'
import Chats from './Components/Chats'
import ChatView from './Components/ChatView'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { login, logout, selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Components/Login'
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img src="https://play-lh.googleusercontent.com/KxeSAjPTKliCErbivNiXrd6cTwfbqUJcbSRPe_IBVK_YmwckfMRS1VIHz-5cgT09yMo" alt=""
              className="app__logo"
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route exact path="/chatInput/view">
                    <ChatView />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebCamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
