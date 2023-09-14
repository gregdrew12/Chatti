import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  currentPage: string;
  onCurrentClick: () => void;
  onRecentsClick: () => void;
}

function Header(props:HeaderProps) {
  const [currentIsHovered, setCurrentIsHovered] = useState(false);
  const [recentsIsHovered, setRecentsIsHovered] = useState(false);

  const buttonActive = {
    backgroundColor: '#acacac'
  }

  return (
    <header>
      <button
        onClick={props.onCurrentClick}
        className='header-button' id='current'
        style={props.currentPage === 'current' ? buttonActive : {backgroundColor: currentIsHovered ? '#acacac' : '#d8d8d8'}}
        onMouseEnter={() => setCurrentIsHovered(true)}
        onMouseLeave={() => setCurrentIsHovered(false)}
      >
        Current
      </button>
      <button
        onClick={props.onRecentsClick}
        className='header-button' id='recent'
        style={props.currentPage === 'recents' ? buttonActive : {backgroundColor: recentsIsHovered ? '#acacac' : '#d8d8d8'}}
        onMouseEnter={() => setRecentsIsHovered(true)}
        onMouseLeave={() => setRecentsIsHovered(false)}
      >
        Recents
      </button>
    </header>
  );
};

export default Header;