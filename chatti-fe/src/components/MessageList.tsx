import React, { useState, useEffect} from 'react';
import { API_URL } from '../constants';
import axios from "axios";

interface MessageListProps {
  article: number;
}

function MessageList(props: MessageListProps) {

  const [messages, setMessages] = useState<any[]>([])
  const article = props.article

  useEffect(() => {
    axios.get("http://localhost:8000/api/messages/", {params: {article: article}}).then(res => setMessages(res.data))
  }, []);
  
  return (
    <div style={{color: 'red'}}>
      {messages.length > 0 ? messages[0].content : 'No messages yet.'}
    </div>
  );
}

export default MessageList;