import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import LanguageForm from '../../modules/language/components/LanguageForm';
import useLanguage from '../../modules/language/hooks/useLanguage';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import useUpdateLanguage from '../../modules/language/hooks/useUpdateLanguage';
import PageHeader from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import FormWrapper from '../../modules/common/components/FormWrapper';
import Loading from '../../modules/common/components/Loading';

const UpdateLanguage = () => {
  const { updateLanguage } = useUpdateLanguage();
  const { push, query } = useRouter();
  const { languageId } = query;
  const { setModal } = useModal();
  const { removeLanguage } = useRemoveLanguage();
  const { language, loading } = useLanguage({ languageId });

  const onSubmitSuccess = () => {
    push('/language');
  };
  const { formatMessage } = useIntl();

  const onSubmit = async ({ isoCode, isActive }) => {
    await updateLanguage({ isoCode, isActive, languageId });
    return true;
  };

  const onDelete = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_language_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language?',
        })}
        onOkClick={async () => {
          setModal('');
          await removeLanguage({});
          toast.success(
            formatMessage(
              {
                id: 'language_deleted',
                defaultMessage: 'Language {languageId} deleted successfully',
              },
              {
                languageId,
              },
            ),
          );
          push('/language');
        }}
        okText={formatMessage({
          id: 'delete_language',
          defaultMessage: 'Delete language',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex align-center justify-between min-w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'update_language_header',
            defaultMessage: 'Update language',
          })}
        />

        <HeaderDeleteButton onClick={onDelete} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-6  sm:max-w-xl">
          <FormWrapper>
            <LanguageForm
              isEdit
              defaultValue={language}
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
            />
          </FormWrapper>
        </div>
      )}
    </>
  );
};

export default UpdateLanguage;
