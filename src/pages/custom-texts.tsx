import { useIntl } from 'react-intl';
import BreadCrumbs from '../modules/common/components/BreadCrumbs';
import PageHeader from '../modules/common/components/PageHeader';
import CustomTextManager from '../modules/i18n/components/CustomTextManager';

const CustomTextsPage = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="max-w-6xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'custom_texts_management',
          defaultMessage: 'Custom Texts Management',
        })}
        description={formatMessage({
          id: 'custom_texts_description',
          defaultMessage: 'Configure custom text overrides for help messages, labels, and other UI elements.',
        })}
      />
      <CustomTextManager />
    </div>
  );
};

export default CustomTextsPage;