import axiosClient from '../axiosClient';

export const uploadFile = file => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
