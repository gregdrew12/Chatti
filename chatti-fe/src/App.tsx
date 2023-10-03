import React, { useState, useEffect} from 'react';
import "./App.css"
import { API_URL } from './constants';
import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import RecentArticles from './components/RecentArticles';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface UserArticleRelationship {
  id: number;
  user: string;
  article: number;
  url: string;
  last_viewed: string;
}

function App() {
  const [recents, setRecents] = useState<UserArticleRelationship[]>([])
  const [currentPage, setCurrentPage] = useState<'current' | 'recents'>('current');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (localStorage.getItem('id') === null) {
      localStorage.setItem('id', uuidv4());
    }
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      setUrl(tabs[0].url || '');
    });
    if (recents.length === 0) {
      getRecents();
    }
  }, [recents, url]);

  const getRecents = () => {
    axios.get(API_URL + 'articles/recents/', {params: {user: localStorage.getItem('id')}})
    .then(res => setRecents(res.data.filter((obj: { url: string; }) => obj.url !== url)));
  }

  const handleCurrentClick = () => {
    setCurrentPage('current');
  };

  const handleRecentsClick = () => {
    setCurrentPage('recents');
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onCurrentClick={handleCurrentClick} onRecentsClick={handleRecentsClick}/>
      {currentPage === 'current' ? <ChatRoom recents={recents}/> : <RecentArticles recents={recents}/>}
    </div>
  );
}

export default App;
