import React, { useState, useEffect} from 'react';
import "./App.css"
import { API_URL } from './constants';
import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import RecentArticles from './components/RecentArticles';
import axios from "axios";

function App() {
  const [currentPage, setCurrentPage] = useState<'current' | 'recents'>('current');

  const handleCurrentClick = () => {
    setCurrentPage('current');
  };

  const handleRecentsClick = () => {
    setCurrentPage('recents');
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} onCurrentClick={handleCurrentClick} onRecentsClick={handleRecentsClick}/>
      {currentPage === 'current' ? <ChatRoom/> : <RecentArticles/>}
    </div>
  );
}

export default App;
