import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from 'axios';


function Album() {
  const [apiResponse, setApiResponse] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      axios.get('http://localhost:9000/testAPI')
        .then(response => {
          setApiResponse(Object.values(response.data));
        });
    };
    callAPI();
  }, []);

  console.log(apiResponse);

  return (
    <div className='WrapAlbum'>
      {/* <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}> */}
      <Box className='Album'>
        <ImageList variant="masonry" cols={3} gap={8}>
          {apiResponse.map((item) => (
            <ImageListItem key={item._id} className='PhotoCard'>
              <img
                className='Photo'
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.url}?w=248&fit=crop&auto=format`}
                alt={item.tags + ", " + item.location + ", "}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={item.tags + " " + item.location + " " + item.kudos + "❤️"} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default Album;