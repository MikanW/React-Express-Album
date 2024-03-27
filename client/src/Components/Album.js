import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
              <ImageListItemBar
                position="below"
                title={item.tags + " " + item.location}
                actionIcon={
                  <IconButton className='KudoButton'
                    sx={{ color: 'rgba(166, 24, 24, 0.143)' }}
                    aria-label={`Left Kudos for ${item.title}`}
                  >
                    <p>{item.kudos}</p>
                    <FavoriteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default Album;