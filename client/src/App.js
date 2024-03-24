import React, { useState, useEffect } from 'react';
import './App.css';
import './Components/Album'
import Album from './Components/Album';



function App() {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetch("http://localhost:9000/testAPI");
        const data = await response.text();
        setApiResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callAPI();
  }, []);

  return (
    <div className="App">
      <Album />
    </div>
  );
}

export default App;
