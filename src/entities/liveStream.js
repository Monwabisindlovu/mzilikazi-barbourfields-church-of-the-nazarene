export const createLiveStream = (data = {}) => ({
  title: data.title || '',
  description: data.description || '',
  stream_url: data.stream_url || '',
  is_live: data.is_live ?? false,
  scheduled_date: data.scheduled_date || null, // ISO string
});

export const validateLiveStream = liveStream => {
  const errors = {};

  if (!liveStream.title || liveStream.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (liveStream.is_live && !liveStream.stream_url) {
    errors.stream_url = 'Stream URL is required if the livestream is live';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
