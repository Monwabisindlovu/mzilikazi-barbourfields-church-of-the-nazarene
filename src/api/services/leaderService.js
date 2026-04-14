import axiosClient from '../axiosClient';

export const getLeaders = () => axiosClient.get('/leaders');
export const getLeaderById = id => axiosClient.get(`/leaders/${id}`);
export const createLeader = data => axiosClient.post('/leaders', data);
export const updateLeader = (id, data) => axiosClient.put(`/leaders/${id}`, data);
export const deleteLeader = id => axiosClient.delete(`/leaders/${id}`);
