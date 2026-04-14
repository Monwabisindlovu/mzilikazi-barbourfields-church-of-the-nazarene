export const createAnnouncement = (data = {}) => ({
  title: data.title || '',
  content: data.content || '',
  image_url: data.image_url || '',
  video_url: data.video_url || '',
  link_url: data.link_url || '',
  link_text: data.link_text || '',
  is_active: data.is_active ?? true,
  display_order: data.display_order ?? 0,
});

export const validateAnnouncement = announcement => {
  const errors = {};

  if (!announcement.title || announcement.title.trim() === '') {
    errors.title = 'Announcement title is required';
  }

  if (!announcement.content || announcement.content.trim() === '') {
    errors.content = 'Announcement content is required';
  }

  if (announcement.display_order && typeof announcement.display_order !== 'number') {
    errors.display_order = 'Display order must be a number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
