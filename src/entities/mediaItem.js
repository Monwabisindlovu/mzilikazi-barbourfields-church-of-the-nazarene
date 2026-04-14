export const createMediaItem = (data = {}) => ({
  title: data.title || '',
  description: data.description || '',
  media_type: data.media_type || 'image', // image | video

  // 🔥 NEW: support multiple files
  files: Array.isArray(data.files)
    ? data.files
    : data.file_url
      ? [data.file_url] // fallback for old data
      : [],

  // keep single file for backward compatibility
  file_url: data.file_url || '',

  category: data.category || 'Other',
  is_featured: data.is_featured || false,
});
