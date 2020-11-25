import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import SiteBar from './components/SiteBar';
import { setTokenSourceMapRange } from 'typescript';


function App() {
  
  const [sessionToken, setSessionToken] = useState<string | null>();

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
   
  }, [])

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const deleteToken = () => {
    localStorage.clear();
    setSessionToken(null);
    console.log('token deleted')
  }
  
  return (
    <div className="App">
     
      <SiteBar updateToken={updateToken} deleteToken={deleteToken}/>

    </div>
  );
}

export default App;
