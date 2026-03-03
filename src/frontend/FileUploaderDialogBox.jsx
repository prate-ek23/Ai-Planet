import { useState } from 'react';
import Button from './Button';
import FileName from './FileName';
import { useRef } from 'react';
import {
  handleDocumentParser,
  handleSupabaseUpload,
} from './services/uploader';

function FileUploaderDialogBox({ isUploading, setIsUploading, setIsParsing }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click(); // trigger the hidden input
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setSelectedFile(uploadedFile);
    setIsUploading(true);
    setIsParsing(true);
    handleDocumentParser(uploadedFile, setIsParsing);
        
    setTimeout(() => {
      handleSupabaseUpload(uploadedFile, setIsUploading);
    }, 2000);
  };

  return (
    <div>
      {
        <FileName
          fileName={
            isUploading
              ? 'Uploading document..'
              : selectedFile && isUploading == false
              ? selectedFile.name
              : 'Upload file'
          }
        />
      }

      <input
        type="file"
        accept="application/pdf"
        ref={inputRef}
        style={{ display: 'none' }} // hide the input
        onChange={(e) => {
          handleFileChange(e);
          setIsUploading(true);
        }}
      />

      <Button
        disabled={isUploading}
        onClick={handleButtonClick}
        style={{
          backgroundColor: '#FFFFFF',
          padding: '15px',
          maxWidth: '100%',
          margin: '19px 3.5rem 19px 0',
          boxShadow: 'none',
          fontWeight: '600',
        }}
      >
        Upload File
      </Button>
    </div>
  );
}

export default FileUploaderDialogBox;