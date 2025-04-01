export const isBase64 = (str: string): boolean => {
  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
};

export const isValidUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};

export const getImageUrl = (image: string | null): string => {
  let imageUrl = 'assets/images/animal-placeholder.jpg';

  if (!image) return imageUrl;

  if (isBase64(image)) imageUrl = `data:image/jpeg;base64,${image}`;
  else if (isValidUrl(image)) return image;

  return imageUrl;
};
