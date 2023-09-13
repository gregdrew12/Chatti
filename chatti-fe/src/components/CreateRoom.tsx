// import './MessageList.css';
// import './InputForm.css';
import './CreateRoom.css'
import React from 'react';

interface Props {
  isArticle: boolean;
  createRoom: () => void;
}

function CreateRoom(props:Props) { 

  const create = (
    <><label className='input-label'>
      This article doesn't have a chat room yet, would you like to create one?
    </label><br /><button className="submit-button" onClick={props.createRoom}>Create Room</button></>
  )

  return (
    <div className='chat-container'>
        <div className="form-container">
            {props.isArticle ? create : 
              <label className='input-label'>
                Not a valid or supported article.
              </label>
            }
        </div>
    </div>
  );
}

export default CreateRoom;