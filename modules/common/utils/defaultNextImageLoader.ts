const defaultNextImageLoader = ({ src, width, quality }) => {
  if (src) return `${src}?w=${width}&q=${quality || 75}`;

  return '/no-image.jpg';
};

export default defaultNextImageLoader;
