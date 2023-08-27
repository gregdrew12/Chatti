import React, { useState, useEffect} from 'react';
import { API_URL } from '../constants';
import MessageList from './MessageList';
import axios from "axios";

function ChatRoom() {

  const [url, setUrl] = useState('');
  const [article, setArticle] = useState<any[]>([])

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      let url = tabs[0].url;
      if(typeof url === 'string')
      {
        setUrl(url);
      }

    axios.get(API_URL, {params: {url: url}}).then(res => setArticle(res.data))    
  });
  }, []);

  return (
    <div style={{color: 'red'}}>
      Welcome to Chatti! <br/>
      {article.length > 0 ? <MessageList article={article[0].pk}/> : 'This article is not in the database.'}
    </div>
  );
}

export default ChatRoom;