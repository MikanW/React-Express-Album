import * as React from 'react';
import PreviewItem from './PreviewItem';
import { usePhotoList } from './PhotoListContext';
import './Uploader.css'
import {
  FilePreviewContainer,
  PreviewList,
} from "./FileUpload.styles";


const UploadPreview = () => {

  const { photos } = usePhotoList();

  return (
    <FilePreviewContainer>
      <span>Preview</span>
      <PreviewList>
        {photos.map(photo => (
          <PreviewItem photo={photo} />
        ))}
      </PreviewList>
    </FilePreviewContainer >
  );
}

export default UploadPreview;