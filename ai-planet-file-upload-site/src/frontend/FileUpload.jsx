import { useState } from 'react';
import supabase from '../supabase';
import Button from './Button';
import FileName from './FileName';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isuploading, setUploading] = useState(false);
  // const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    setUploading(true);
    const filePath = `USER_NAME-${Math.random()}-${
      selectedFile.name
    }`.replaceAll('/', '');

    const { data, error } = await supabase.storage
      .from('file-uploads')
      .upload(filePath, selectedFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    setUploading(false);

    if (error) {
      console.error('Upload error:', error);
      alert('Upload failed!');
    } else {
      console.log('Upload success:', data);
      alert('Upload successful!');
    }
  };
  return (
    <div>
      <FileName />
      {/* {!isuploading && <FileName />} */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      <Button
        disabled={isuploading}
        onClick={handleUpload}
        style={{
          backgroundColor: '#FFFFFF',
          padding: '15px',
          maxWidth: '100%',
          margin: '19px 3.5rem 19px 0',
          boxShadow: 'none',
          fontWeight: '600',
          //   right: '0',
          //   left: 'auto',
        }}
      >
        Upload File
      </Button>
    </div>
  );
}

export default FileUpload;

// import React, { useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import Button from './Button';

// const supabaseUrl = 'https://your-project.supabase.co';
// const supabaseKey = 'public-anon-key';
// const supabase = createClient(supabaseUrl, supabaseKey);

// function UploadPdf() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [uploadedUrl, setUploadedUrl] = useState('');

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             alert('Please select a file first!');
//             return;
//         }

//         setUploading(true);

//         const filePath = `${Date.now()}_${selectedFile.name}`; // unique filename

//         const { data, error } = await supabase
//             .storage
//             .from('pdf-uploads') // your bucket name
//             .upload(filePath, selectedFile, {
//                 cacheControl: '3600',
//                 upsert: false,
//                 contentType: 'application/pdf',
//             });

//         setUploading(false);

//         if (error) {
//             console.error('Upload error:', error);
//             alert('Upload failed!');
//         } else {
//             console.log('Upload success:', data);
//             const publicUrl = supabase
//                 .storage
//                 .from('pdf-uploads')
//                 .getPublicUrl(filePath).data.publicUrl;
//             setUploadedUrl(publicUrl);
//             alert('Upload successful!');
//         }
//     };

//     return (
//         <div>
//             <h2>Upload PDF to Supabase</h2>
//             <button onClick={handleUpload} disabled={uploading}>
//                 {uploading ? 'Uploading...' : 'Upload'}
//             </button>

//             {uploadedUrl && (
//                 <div>
//                     <p>Uploaded File:</p>
//                     <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
//                         {uploadedUrl}
//                     </a>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UploadPdf;
