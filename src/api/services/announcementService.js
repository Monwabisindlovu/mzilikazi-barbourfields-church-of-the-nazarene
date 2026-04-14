import axiosClient from '../axiosClient';

export const getAnnouncements = () => axiosClient.get('/announcements');
export const getAnnouncementById = id => axiosClient.get(`/announcements/${id}`);
export const createAnnouncement = data => axiosClient.post('/announcements', data);
export const updateAnnouncement = (id, data) => axiosClient.put(`/announcements/${id}`, data);
export const deleteAnnouncement = id => axiosClient.delete(`/announcements/${id}`);
