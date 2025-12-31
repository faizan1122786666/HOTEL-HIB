import api from '../utils/api';

// Submit contact form
export const submitContactForm = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Get all contact submissions (Admin)
export const getAllContactSubmissions = async () => {
  const response = await api.get('/contact');
  return response.data.data;
};

// Get single contact submission (Admin)
export const getContactSubmission = async (id) => {
  const response = await api.get(`/contact/${id}`);
  return response.data.data;
};

// Update contact status (Admin)
export const updateContactStatus = async (id, status) => {
  const response = await api.put(`/contact/${id}`, { status });
  return response.data.data;
};

// Delete contact submission (Admin)
export const deleteContactSubmission = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};