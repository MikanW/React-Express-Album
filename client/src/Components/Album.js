import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import Photo from './Photo';


function Album() {
  const [apiResponse, setApiResponse] = useState([]);
  const [kudoStatus, setKudoStatus] = useState(false);
  const [kudoColor, setKudoColor] = useState('rgba(166, 24, 24, 0.143)');

  useEffect(() => {
    const callAPI = async () => {
      axios.get('http://localhost:9000/testAPI')
        .then(response => {
          setApiResponse(Object.values(response.data));
        });
    };
    callAPI();
  }, []);

  const onKudoClick = () => {
    console.log("kudos!")
    if (false == kudoStatus) {
      setKudoStatus(true);
      setKudoColor('rgba(177, 36, 36, 0.734)');
    }
  }

  return (
    <div className='WrapAlbum'>
      <Box className='Album'>
        <ImageList variant="masonry" cols={4} gap={10}>
          {apiResponse.map((item) => (
            <Photo
              key={item._id}
              item={item}
            />
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default Album;