import React, { useState, useEffect} from 'react';
import "./App.css"
import { API_URL } from './constants';
import axios from "axios";

function App() {

  const [url, setUrl] = useState('');
  const [article, setArticle] = useState(null)

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      let url = tabs[0].url;
      if(typeof url === 'string')
      {
        setUrl(url);
      }

    axios.get(API_URL, {params: {url: url}}).then(res => {
      if(res.data.length > 0) {
        setArticle(res.data[0])
      }

    })
      
  });
  }, []);

  return (
    <div className="App" style={{color: 'red'}}>
      Welcome to Chatti! <br/>
      This article is {article != null ? 'in the database!' : 'not in the database.'}
    </div>
  );
}

export default App;
