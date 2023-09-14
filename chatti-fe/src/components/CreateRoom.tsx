// import './MessageList.css';
// import './InputForm.css';
import './CreateRoom.css'
import React from 'react';

interface CreateRoomProps {
  isArticle: boolean;
  createRoom: () => void;
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
              <label className='create-label'>
                Not a valid or supported article.
              </label>
            }
        </div>
    </div>
  );
}

export default CreateRoom;