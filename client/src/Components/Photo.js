import React, { useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Photo(props) {
  const [kudoStatus, setKudoStatus] = useState(false);
  const [kudoColor, setKudoColor] = useState('rgba(166, 24, 24, 0.143)');

  console.log(props.item);
  const onKudoClick = () => {
    console.log("kudos!")
    if (false == kudoStatus) {
      setKudoStatus(true);
      setKudoColor('rgba(177, 36, 36, 0.734)');
    }
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
      <ImageListItemBar
        position="below"
        title={props.item.tags + " " + props.item.location}
        actionIcon={
          <IconButton className='KudoButton'
            sx={{ color: kudoColor }}
            aria-label={`Left Kudos for ${props.item.title}`}
            onClick={onKudoClick}
          >
            <FavoriteIcon />
            <p>{props.item.kudos}</p>
          </IconButton>
        }
      />
    </ImageListItem>
  );
}

export default Photo;

