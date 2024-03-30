import React, { useState } from 'react';
import axios from 'axios';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Photo(props) {
  const [kudoCount, setKudoCount] = useState(props.item.kudos);
  const [kudoStatus, setKudoStatus] = useState(false);
  const [kudoColor, setKudoColor] = useState('rgba(166, 24, 24, 0.143)');

  const onKudoClick = async () => {
    if (false === kudoStatus) {
      axios.post('http://localhost:9000/apiPostKudo', {
        photoId: props.item._id,
      })
        .then(response => {
          setKudoCount(response.data);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
    setKudoStatus(true);
    setKudoColor('rgba(177, 36, 36, 0.734)');
  }

  return (
    <ImageListItem className='PhotoCard'>
      <img
        className='Photo'
        srcSet={`${props.item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${props.item.url}?w=248&fit=crop&auto=format`}
        alt={props.item.tags + ", " + props.item.location + ", "}
        loading="lazy"
      />
      <div className='PhotoInfo'>
        <div>
          <p># {props.item.tags}  @ {props.item.location}</p>
        </div>
        <div className='WrapKudoButton'>
          <IconButton className='KudoButton'
            sx={{ color: kudoColor }}
            aria-label={`Left Kudos for ${props.item.title}`}
            onClick={onKudoClick}
          >
            <FavoriteIcon />
            <p>{kudoCount}</p>
          </IconButton>
        </div>
      </div>
    </ImageListItem>
  );
}

export default Photo;

