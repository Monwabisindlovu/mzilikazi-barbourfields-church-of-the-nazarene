import axiosClient from '../axiosClient';

export const getMediaItems = () => axiosClient.get('/media-items');
export const getMediaItemById = id => axiosClient.get(`/media-items/${id}`);
export const createMediaItem = data => axiosClient.post('/media-items', data);
export const updateMediaItem = (id, data) => axiosClient.put(`/media-items/${id}`, data);
export const deleteMediaItem = id => axiosClient.delete(`/media-items/${id}`);
