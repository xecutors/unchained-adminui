const defaultNextImageLoader = ({ src, width, quality }) => {
  if (!src) return `${src}?w=${width}&q=${quality || 75}`;

  return '/product_placeholder.png';
};

export default defaultNextImageLoader;
