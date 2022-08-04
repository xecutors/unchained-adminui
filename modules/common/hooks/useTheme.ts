import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeWrapper';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('Theme Context was used outside of its Provider');
  }

  return context;
};

export default useTheme;
