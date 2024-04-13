import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import FileUpload from './FileUpload';
import { usePhotoList } from './PhotoListContext';
import UploadPreview from './UploadPreview';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


const BtnModalFileUpload = () => {
  const { photos, removeAllPhotos } = usePhotoList();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    removeAllPhotos();
    setOpen(false);
  };


  const onSend = async () => {
    await postSendFiles();
    setOpen(false);
  }

  const postSendFiles = async () => {
    console.log(photos.length);
    if (photos.length > 0) {
      const formData = new FormData();
      photos.forEach((photo) => {
        formData.append('files', photo.file);
        formData.append('tags', photo.tag);
        formData.append('locations', photo.location);
      });

      photos.forEach((photo) => {
        formData.append('tags', photo.tag);
      });


      fetch('http://localhost:9000/apiPostUploadPhoto', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          return;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

  }

  return (
    <React.Fragment>
      <div
        style={{ cursor: 'pointer' }}
        className='WrapAddPhoto'
        onClick={handleClickOpen}>
        <AddPhotoAlternateIcon />
        <span >AddNew</span>
      </div>
      <Dialog
        className='UploadPhotoModal'
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle style={{ cursor: 'move' }} >
          Upload New Photos
        </DialogTitle>
        <DialogContent>
          <FileUpload accept="image/*" />
          <UploadPreview />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ backgroundColor: "grey" }}
            onClick={onSend}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}

export default BtnModalFileUpload;