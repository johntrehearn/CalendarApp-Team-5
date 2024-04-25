// Extract url string from File object
export const getFileUrl = (file: File) => URL.createObjectURL(file);

// Check if the file type is a safe image
export const isSafeImageType = (fileType: string) => {
  const safeImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  return safeImageTypes.includes(fileType);
};
