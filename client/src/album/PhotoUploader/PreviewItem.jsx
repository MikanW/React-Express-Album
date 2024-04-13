import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TagIcon from '@mui/icons-material/Tag';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EditableLabel from '../../Util/EditableLabel';
import {
  ImagePreview,
  PreviewContainer,
  FileMetaData,
} from "./FileUpload.styles";
import { usePhotoList } from './PhotoListContext';


const PreviewItem = ({
  photo,
}) => {

  const { removePhoto, updatePhotoProps } = usePhotoList();

  const isImageFile = () => {
    if (photo.type.split("/")[0] === "image") {
      return true;
    }
    else {
      return false;
    }
  }

  const handleRemovePhoto = () => {
    removePhoto(photo.id);
  }

  const setTag = (value) => {
    console.log(value);
    updatePhotoProps(photo.id, { tag: value });
  }

  const setLocation = (value) => {
    updatePhotoProps(photo.id, { location: value });
  }

  return (
    <PreviewContainer key={photo.id}>
      <div>
        {isImageFile && (
          <ImagePreview
            src={photo.url}
            alt={`file preview ${photo.id}`}
          />
        )}
        <FileMetaData isimagefile={isImageFile}>
          <div className='WrapRemoveBtm'>
            <IconButton
              className='removePhotoBtn'
              sx={{ color: "white" }}
              onClick={handleRemovePhoto}
            >
              <ClearIcon fontSize="xs" />
            </IconButton>
          </div>

          <div className='WrapEditMeta'>
            <div className='WrapEditWithIconLine'>
              <TagIcon fontSize='xs' />
              <EditableLabel initialText={"Click to edit"} onBlurCb={setTag} className="EditLabel" />
            </div>
            <div className='WrapEditWithIconLine'>
              <AlternateEmailIcon fontSize='xs' />
              <EditableLabel initialText={"Click to edit"} onBlurCb={setLocation} className="EditLabel" />
            </div>
          </div>

        </FileMetaData>
      </div >
    </PreviewContainer >
  );
}

export default PreviewItem;