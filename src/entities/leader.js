export const createLeader = (data = {}) => ({
  name: data.name || '',
  role: data.role || '',
  image_url: data.image_url || '',
  bio: data.bio || '',
  is_pastor: data.is_pastor ?? false,
  display_order: data.display_order ?? 0,
});

export const validateLeader = leader => {
  const errors = {};

  if (!leader.name || leader.name.trim() === '') {
    errors.name = 'Leader name is required';
  }

  if (!leader.role || leader.role.trim() === '') {
    errors.role = 'Leader role is required';
  }

  if (leader.display_order && typeof leader.display_order !== 'number') {
    errors.display_order = 'Display order must be a number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
