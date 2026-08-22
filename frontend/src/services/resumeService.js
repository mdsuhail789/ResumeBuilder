import API from './api';

export const getResumes = async () => {
  const response = await API.get('/resumes');
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await API.get(`/resumes/${id}`);
  return response.data;
};

export const createResume = async (resumeData) => {
  const response = await API.post('/resumes', resumeData);
  return response.data;
};

export const updateResume = async (id, resumeData) => {
  const response = await API.put(`/resumes/${id}`, resumeData);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await API.delete(`/resumes/${id}`);
  return response.data;
};

export const togglePublicResume = async (id, isPublic) => {
  const response = await API.patch(`/resumes/${id}/public`, { isPublic });
  return response.data;
};

export const getPublicResume = async (id) => {
  const response = await API.get(`/resumes/public/${id}`);
  return response.data;
};
