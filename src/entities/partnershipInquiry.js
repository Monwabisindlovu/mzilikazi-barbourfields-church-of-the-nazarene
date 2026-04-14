export const createPartnershipInquiry = (data = {}) => ({
  name: data.name || '',
  email: data.email || '',
  message: data.message || '',
  status: data.status || 'new', // new | contacted | resolved
});

export const validatePartnershipInquiry = inquiry => {
  const errors = {};

  if (!inquiry.name || inquiry.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!inquiry.email || inquiry.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(inquiry.email)) {
    errors.email = 'Email is invalid';
  }

  if (!inquiry.message || inquiry.message.trim() === '') {
    errors.message = 'Message is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
