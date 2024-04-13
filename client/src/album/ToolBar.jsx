import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileUpload from './PhotoUploader/FileUpload';
import BtnModalFileUpload from './PhotoUploader/BtnModalFileUpload';
import { PhotoListProvider } from './PhotoUploader/PhotoListContext';


const ToolBar = () => {

  return (
    <>
      <div className="ToolBar">
        <div>
          Search
        </div>
        <PhotoListProvider>
          <BtnModalFileUpload />
        </PhotoListProvider>

      </div>
    </>
  )
}

export default ToolBar;