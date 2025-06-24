import { useIntl } from 'react-intl';
import { useCustomText } from '../components/CustomTextProvider';

interface UseCustomMessageOptions {
  category?: 'help' | 'label' | 'general';
  fallback?: string;
}

export const useCustomMessage = () => {
  const { formatMessage } = useIntl();
  const { getCustomText } = useCustomText();

  const formatCustomMessage = (
    messageDescriptor: { id: string; defaultMessage?: string },
    values?: Record<string, any>,
    options: UseCustomMessageOptions = {},
  ): string => {
    const { category = 'general', fallback } = options;

    // First check for custom text override
    const customText = getCustomText(messageDescriptor.id, category);
    if (customText) {
      // Simple placeholder replacement for custom texts
      if (values) {
        return Object.entries(values).reduce(
          (text, [key, value]) =>
            text.replace(new RegExp(`{${key}}`, 'g'), String(value)),
          customText,
        );
      }
      return customText;
    }

    // Fall back to standard react-intl formatting
    try {
      return formatMessage(messageDescriptor, values);
    } catch (error) {
      console.warn(`Translation missing for key: ${messageDescriptor.id}`);
      return (
        fallback || messageDescriptor.defaultMessage || messageDescriptor.id
      );
    }
  };

  const formatHelpMessage = (
    messageDescriptor: { id: string; defaultMessage?: string },
    values?: Record<string, any>,
  ): string => {
    return formatCustomMessage(messageDescriptor, values, { category: 'help' });
  };

  const formatLabelMessage = (
    messageDescriptor: { id: string; defaultMessage?: string },
    values?: Record<string, any>,
  ): string => {
    return formatCustomMessage(messageDescriptor, values, {
      category: 'label',
    });
  };

  return {
    formatCustomMessage,
    formatHelpMessage,
    formatLabelMessage,
  };
};

export default useCustomMessage;
