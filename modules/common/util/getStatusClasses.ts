const getStatusClasses = (status) => {
  if (status) return 'bg-green-100 text-green-800';

  return 'bg-red-100 text-red-800';
};

export default getStatusClasses;
