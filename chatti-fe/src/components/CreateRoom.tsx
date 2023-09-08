import React, { useState, useEffect, useRef} from 'react';
import { API_URL } from '../constants';
import axios from "axios";
import './MessageList.css';
import './InputForm.css';
import { animateScroll as scroll } from 'react-scroll';

interface Props {
    createRoom: () => void;
}

function CreateRoom(props:Props) { 
  return (
    <div className='chat-container'>
        <div className="form-container">
            <label className='input-label'>This article doesn't have a chat room yet, would you like to create one?</label>
            <button className="submit-button" onClick={props.createRoom}>Create Room</button>
        </div>
    </div>
  );
}

export default CreateRoom;