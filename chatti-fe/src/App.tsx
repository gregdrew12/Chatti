import React, { useState, useEffect} from 'react';
import "./App.css"
import { API_URL } from './constants';
import ChatRoom from './components/ChatRoom';
import axios from "axios";

function App() {

  return (
    <div className="App" style={{color: 'red'}}>
      Welcome to Chatti! <br/>
      <ChatRoom/>
    </div>
  );
}

export default App;
