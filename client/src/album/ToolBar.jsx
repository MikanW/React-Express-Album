import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ToolBar = () => {
  const setModal = () => {

  };
  return (
    <div className="ToolBar">
      <div>
        Search
      </div>
      <div
        style={{ cursor: 'pointer' }}
        className='WrapAddPhoto'
        onClick={setModal}>
        <AddPhotoAlternateIcon />
        <span >AddNew</span>
      </div>
    </div>
  )
}

export default ToolBar;