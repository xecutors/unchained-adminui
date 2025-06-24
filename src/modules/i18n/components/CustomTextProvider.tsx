import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

interface CustomText {
  key: string;
  locale: string;
  text: string;
  category?: 'help' | 'label' | 'general';
}

interface CustomTextContextType {
  customTexts: CustomText[];
  getCustomText: (key: string, category?: string) => string | null;
  setCustomText: (key: string, text: string, category?: string) => void;
  removeCustomText: (key: string, category?: string) => void;
}

const CustomTextContext = createContext<CustomTextContextType | null>(null);

export const useCustomText = () => {
  const context = useContext(CustomTextContext);
  if (!context) {
    throw new Error('useCustomText must be used within a CustomTextProvider');
  }
  return context;
};

interface CustomTextProviderProps {
  children: React.ReactNode;
}

export const CustomTextProvider: React.FC<CustomTextProviderProps> = ({
  children,
}) => {
  const { locale } = useIntl();
  const [customTexts, setCustomTexts] = useState<CustomText[]>([]);

  // Load custom texts from localStorage or API
  useEffect(() => {
    const loadCustomTexts = () => {
      try {
        const stored = localStorage.getItem(`custom-texts-${locale}`);
        if (stored) {
          setCustomTexts(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load custom texts:', error);
      }
    };

    loadCustomTexts();
  }, [locale]);

  // Save custom texts to localStorage
  const saveCustomTexts = (texts: CustomText[]) => {
    try {
      localStorage.setItem(`custom-texts-${locale}`, JSON.stringify(texts));
      setCustomTexts(texts);
    } catch (error) {
      console.error('Failed to save custom texts:', error);
    }
  };

  const getCustomText = (key: string, category = 'general'): string | null => {
    const customText = customTexts.find(
      (text) =>
        text.key === key &&
        text.locale === locale &&
        text.category === category,
    );
    return customText?.text || null;
  };

  const setCustomText = (key: string, text: string, category = 'general') => {
    const newTexts = [...customTexts];
    const existingIndex = newTexts.findIndex(
      (t) => t.key === key && t.locale === locale && t.category === category,
    );

    if (existingIndex >= 0) {
      newTexts[existingIndex].text = text;
    } else {
      newTexts.push({
        key,
        locale,
        text,
        category: category as 'help' | 'label' | 'general',
      });
    }

    saveCustomTexts(newTexts);
  };

  const removeCustomText = (key: string, category = 'general') => {
    const newTexts = customTexts.filter(
      (t) => !(t.key === key && t.locale === locale && t.category === category),
    );
    saveCustomTexts(newTexts);
  };

  const value: CustomTextContextType = {
    customTexts,
    getCustomText,
    setCustomText,
    removeCustomText,
  };

  return (
    <CustomTextContext.Provider value={value}>
      {children}
    </CustomTextContext.Provider>
  );
};

export default CustomTextProvider;
