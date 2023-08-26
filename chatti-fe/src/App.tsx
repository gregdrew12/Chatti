import React, { useState, useEffect} from 'react';
import "./App.css"

function App() {

  const [url, setUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      let url = tabs[0].url;
      if(typeof url === 'string')
      {
        setUrl(url);
      }
      
  });
  }, []);

  return (
    <div className="App" style={{color: 'red'}}>
      Welcome to Chatti! <br/>
      The current URL is {url}
    </div>
  );
}

export default App;
