import React, { useRef, useState } from "react";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  InputLabel
} from "./FileUpload.styles";
import { usePhotoList } from "./PhotoListContext";


const FileUpload = ({
  label,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const { addPhoto } = usePhotoList();

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      addPhoto(newFiles);
    }
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag & Drop or Click to upload Files</DragDropText>
        <div className="Uploader">
          <FormField
            type="file"
            ref={fileInputField}
            onChange={handleNewFileUpload}
            title=""
            value=""
            multiple={true}
            {...otherProps}
          />
        </div>
      </FileUploadContainer>

    </>
  );
};

export default FileUpload;