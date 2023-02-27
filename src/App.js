import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer.jsx"
import Navbar from './components/Navbar/Navbar.jsx';
import ProfileContainer from './components/Profile/ProfileContainerHook';
import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';
import News from './components/News/News.jsx'
import Music from './components/Music/Music.jsx'
import Settings from './components/Settings/Settings.jsx'
import UserContainer from './components/Users/UsersContainerHook'
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/preloader';
import {Provider} from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store.js';

const App = (props) => {


  useEffect(()=>{
    props.initializeApp()
  },[])

  if(!props.initialized){
    return <Preloader />
  }
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route 
            path='/profile/:userId?' 
            element={
              <ProfileContainer />
            } 
          />
          <Route 
            path='/dialogs/*' 
            element={
              <DialogsContainer />
            } 
          />
          <Route path='/login' element={<Login />} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/users' element={<UserContainer />}/>
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

let mapStateToProps = (state) =>({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps,{initializeApp}) (App);

let MainApp = (props) => {
  return(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
  )
}

export default MainApp;