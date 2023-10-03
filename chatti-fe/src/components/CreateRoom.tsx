// import './MessageList.css';
// import './InputForm.css';
import './CreateRoom.css'
import React from 'react';

interface CreateRoomProps {
  isArticle: boolean;
  createRoom: () => void;
  sources: Set<string>
}

function CreateRoom(props:CreateRoomProps) { 

  const create = (
    <><label className='create-label'>
      This article doesn't have a chat room yet, would you like to create one?
    </label><br /><button className="create-button" onClick={props.createRoom}>Create Room</button></>
  )

  return (
    <div className='create-chat-container'>
        <div className="create-form-container">
            {props.isArticle ? create : 
              <div>
                <h1 className='create-label'>
                  Not a valid or supported article.
                </h1>
                <br/>
                <h1 className='create-label'>
                  Our supported news websites are The Washington Post, The New York Times, CNN, and The New York Post. 
                </h1>
              </div>
            }
        </div>
    </div>
  );
}

export default CreateRoom;