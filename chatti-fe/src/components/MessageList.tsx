import React, { useState, useEffect, useRef} from 'react';
import { API_URL } from '../constants';
import axios from "axios";
import './MessageList.css';
import './InputForm.css';
import { animateScroll as scroll } from 'react-scroll';

interface MessageListProps {
  article: number;
}

interface Message {
  pk: number;
  content: string;
  sender: string;
}

function MessageList(props: MessageListProps) {

  const [messageList, setMessageList] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string>('')
  const article = props.article
  const messageListRef = useRef<HTMLDivElement>(null);
  const charLimit = 500;

  useEffect(() => {
    getMessageList()
    const interval = setInterval(getMessageList, 5000);
    setTimeout(() => {
      scrollToBottom();
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const getMessageList = async () => {
    try {
      const response = await axios.get(API_URL+"articles/messages/", {params: {article: article}})
        // .then(res => setMessageList(res.data))
      const newList = response.data;

      if(localStorage.getItem('messageList') === null || localStorage.getItem('messageList') !== newList.length.toString()) {
        //console.log('new message')
        localStorage.setItem('messageList', newList.length.toString());
        setMessageList(newList);

        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
      else {
        //console.log('no new message')
        setMessageList(newList);
      }
    } catch (error) {
      console.error('Error fetching message list', error);
    }
  }

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(message.length > charLimit) {
      setError('Your message exceeds the maximum character limit.');
    }
    else {
      axios.post(API_URL+"articles/messages/", {'content': message, 'article': article, 'sender': localStorage.getItem('id')}).then(() => getMessageList());
      (document.getElementsByClassName('input-box') as unknown as HTMLInputElement).value = '';
      setMessage('');
    }
  }

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };
  
  return (
    <div className='chat-container'>
      <div ref={messageListRef} className='message-list'>
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
          <label className='error-message'>{error}</label>
          <label className='input-label' style={{color: message.length > charLimit ? 'red' : 'gray'}}>{message.length}/500</label>
          <input className='input-box' 
            placeholder="Message" 
            name='message'  
            type='text' value={message}
            required 
            onChange={e => {setMessage(e.target.value)
                            setError('')}}
            />
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MessageList;