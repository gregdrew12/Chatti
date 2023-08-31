import React, { useState, useEffect, useRef} from 'react';
import { API_URL } from '../constants';
import axios from "axios";
import './MessageList.css';
import './InputForm.css';

interface MessageListProps {
  article: number;
}

function MessageList(props: MessageListProps) {

  const [messageList, setMessageList] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const article = props.article
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessageList()
  }, []);

  const getMessageList = () => {
    axios.get(API_URL+"messages/", {params: {article: article}})
      .then(res => setMessageList(res.data))
      .then(() => {
        if (listRef.current) {
          const list = listRef.current;
          list.scrollTop = list.scrollHeight - list.clientHeight;
          console.log('here')
        }
      })
  }

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(API_URL+"messages/", {'content': message, 'article': article, 'sender': localStorage.getItem('id')}).then(() => getMessageList());
    (document.getElementsByClassName('input-box') as unknown as HTMLInputElement).value = '';
    setMessage('')
  }
  
  return (
    <div className='chat-container'>
      <div className='message-list' ref={listRef}>
        {messageList.length > 0 ? (
          messageList.map(message => (
            <div key={message.pk}
              className={`message ${message.sender === localStorage.getItem('id') ? 'user-message' : 'other-message'}`}>
              {message.content}
            </div>
          ))
        ) : <div className='message other-message'>
              Looks like we don't have any messages for this article yet...
            </div>
        }
      </div>


      <br/>
      <form onSubmit={createMessage}>
        <div className="form-container">
          {/* <label className='input-label'>Send a message!</label> */}
          <input className='input-box' 
            placeholder="Message" 
            name='message'  
            type='text' value={message}
            required 
            onChange={e => setMessage(e.target.value)}/>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MessageList;