import React, { useState, useEffect } from 'react';



function Album() {
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
    <div className="Album">
      <header className="Album-header">
        <p className="Album-intro">{apiResponse}</p>
      </header>

    </div>
  );
}

export default Album;