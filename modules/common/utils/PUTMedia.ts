const PUTMedia = async (file, url) => {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: file,
  });
  if (response.ok) {
    return Promise.resolve({});
  }
  return Promise.reject(new Error('error'));
};

export default PUTMedia;
