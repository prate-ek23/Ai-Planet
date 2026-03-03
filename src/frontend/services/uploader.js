import axios from 'axios';
import supabase from '../../supabase';

export const handleSupabaseUpload = async (uploadedFile, setIsUploading) => {
  if (!uploadedFile) {
    alert('Please select a file first!');
    return;
  }

  setIsUploading(true);

  const formData = new FormData();
  formData.append('file', uploadedFile); 

  const filePath = `USER_NAME-${Math.random()}-${uploadedFile.name}`.replaceAll(
    '/',
    ''
  );

  const { data, error } = await supabase.storage
    .from('file-uploads')
    .upload(filePath, uploadedFile, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'application/pdf',
    });

  setIsUploading(false);

  if (error) {
    console.error('Upload error:', error);
    alert('Upload failed!');
  } else {
    console.log('Upload success:', data);
    alert('Upload successful!');
  }
};

export const handleDocumentParser = async (uploadedFile, setIsParsing) => {
  const formData = new FormData();
  formData.append('file', uploadedFile); 

  setIsParsing(true);
  try {
    const res = await axios.post('http://localhost:8000/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Response from server:', res.data);
  } catch (err) {
    console.error(err);
    alert('Error fetching chat response');
    return;
  }
  
  setIsParsing(false);
    
};
