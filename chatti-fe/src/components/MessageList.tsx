import React, { useState, useEffect} from 'react';
import { API_URL } from '../constants';
import axios from "axios";

interface MessageListProps {
  article: number;
}

function MessageList(props: MessageListProps) {

  const [messageList, setMessageList] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const article = props.article

  useEffect(() => {
    getMessageList()
  }, []);

  const getMessageList = () => {
    axios.get(API_URL+"messages/", {params: {article: article}}).then(res => setMessageList(res.data))
  }

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(API_URL+"messages/", {'content': message, 'article': article}).then(() => getMessageList());
    (document.getElementById('input') as HTMLInputElement).value = '';
    setMessage('')
  }
  
  return (
    <div style={{color: 'red'}}>
      {messageList.length > 0 ? (
        messageList.map(message => (
          <div key={message.pk}>
            {message.content}
          </div>
        ))
      ) : 'No messages yet.'}

      <br/>
      <form className="Auth-form" onSubmit={createMessage}>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
              <label>Send a message!</label>
              <input id='input' 
                  placeholder="Message" 
                  name='message'  
                  type='text' value={message}
                  required 
                  onChange={e => setMessage(e.target.value)}/>
          </div>
          <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MessageList;