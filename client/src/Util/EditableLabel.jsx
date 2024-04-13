import React, { useState } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import './EditableLabel.css';


function EditableLabel({ initialText, onBlurCb }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    console.log("handleBlur:" + text);
    onBlurCb(text);
    setIsEditing(false);
  };

  return (
    <Box className="editable-container">
      {isEditing ? (
        <TextField
          value={text}
          sx={{ color: "white" }}
          onChange={handleTextChange}
          onBlur={handleBlur}
          autoFocus
          variant="standard"
          size="small"
          InputProps={{
            className: 'editable-input',
            style: {
              color: 'white',
            }
          }}
        />

      ) : (
        <Typography
          onClick={handleTextClick}
          className="editable-text"
        >
          {text || "Click to edit"}
        </Typography>
      )}
    </Box>
  );
}

export default EditableLabel;
