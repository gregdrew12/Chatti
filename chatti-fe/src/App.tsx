import React, { useState, useEffect} from 'react';
import "./App.css"
import { API_URL } from './constants';
import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import RecentArticles from './components/RecentArticles';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface Article {
  url: string;
}

interface UserArticleRelationship {
  pk: number;
  user: string;
  article: number;
  url: string;
  last_viewed: string;
}

function App() {
  const [recents, setRecents] = useState<UserArticleRelationship[]>([])
  const [currentPage, setCurrentPage] = useState<'current' | 'recents'>('current');

  useEffect(() => {
    if (localStorage.getItem('id') === null) {
      localStorage.setItem('id', uuidv4());
    }
    getRecents();
  }, [recents]);

  async function getRecents() {
    const res = await axios.get(API_URL + 'articles/recents/', {params: {user: localStorage.getItem('id')}})
    setRecents(res.data);
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
