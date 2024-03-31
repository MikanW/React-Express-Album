import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import axios from 'axios';
import Photo from './Photo';
import FileUpload from './FileUpload';
import ToolBar from './ToolBar';


function Album() {
  const [apiResponse, setApiResponse] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      axios.get('http://localhost:9000/apiGetAllPhotos')
        .then(response => {
          setApiResponse(Object.values(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    callAPI();
  }, []);

  const fileUploadCallBack = (files) => {
    console.log(files);
  }

  return (
    <div className='WrapAlbum'>
      <ToolBar />
      <FileUpload accept="image/*" multiple={true} updateFilesCb={fileUploadCallBack} />
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