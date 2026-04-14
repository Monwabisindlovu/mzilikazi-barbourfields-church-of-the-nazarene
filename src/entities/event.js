export const EVENT_CATEGORIES = [
  'Community',
  'Outreach',
  'Compassion',
  'Health',
  'Fun',
  'Spiritual',
  'Prayer',
  'Youth',
  'Other',
];

export const createEvent = (data = {}) => ({
  title: data.title || '',
  description: data.description || '',
  category: data.category || 'Other',
  date: data.date || '',
  start_time: data.start_time || '',
  end_time: data.end_time || '',
  location: data.location || '',
  venue: data.venue || '',
  image_url: data.image_url || '',
  is_featured: data.is_featured ?? false,
});

export const validateEvent = event => {
  const errors = {};

  if (!event.title || event.title.trim() === '') {
    errors.title = 'Event title is required';
  }

  if (!event.date) {
    errors.date = 'Event date is required';
  }

  if (event.category && !EVENT_CATEGORIES.includes(event.category)) {
    errors.category = 'Invalid category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
