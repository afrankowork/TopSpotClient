import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import SiteBar from './components/SiteBar';


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
  
  return (
    <div className="App">
     
      <SiteBar updateToken={updateToken} />

    </div>
  );
}

export default App;
