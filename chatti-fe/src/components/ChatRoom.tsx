import React, { useState, useEffect} from 'react';
import { API_URL } from '../constants';
import MessageList from './MessageList';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import CreateRoom from './CreateRoom';

interface ChatRoomProps {
  recents: {pk: number; user: string; article: number; url: string; last_viewed: string}[]
}

function ChatRoom(props: ChatRoomProps) {

  const [url, setUrl] = useState<string>('');
  const [article, setArticle] = useState<any[]>([]);
  const [isArticle, setIsArticle] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<boolean>(false);
  const sources: Set<string> = new Set(['www.washingtonpost.com', 'www.nytimes.com', 'www.cnn.com',
                                        'nypost.com'])

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      setUrl(tabs[0].url || '');
    });

    let urlParsed = url.split('/').filter(x => x!== '');
    if(sources.has(urlParsed[1])) {
      axios.get(API_URL+'articles', {params: {url: url}})
        .then(res => setArticle(res.data));
      if(article.length === 0) {
        axios.get(API_URL+'sources/'+urlParsed[1].split('.')[1]+'/', {params: {url: url}})
          .then(res => setIsArticle(res.data['is_article']));
      }
    }

  }, [url, newRoom]);

  const createRoom = () => {
    axios.post(API_URL+"articles/", {'url': url})
      .then(() => setNewRoom(true));
  };

  return (
    <div>
      {article.length > 0 ? <MessageList article={article[0].pk} url={url} recents={props.recents}/> : 
        // isArticle ? <CreateRoom createRoom={createRoom}/> : 'Chatti doesn\'t support this article.'}
      <CreateRoom isArticle={isArticle} createRoom={createRoom}/>}
    </div>
  );
}

export default ChatRoom;