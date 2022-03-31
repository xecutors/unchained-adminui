import { useIntl } from 'react-intl';
import useShopInfo from '../../common/hooks/useShopInfo';
import ChoicesField from '../../forms/components/ChoicesField';
import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useSetRoles from '../hooks/useSetRoles';

const UserRolesView = ({ roles, userId }) => {
  const { formatMessage } = useIntl();
  const { shopInfo = {} } = useShopInfo();
  const { setRoles } = useSetRoles();
  const { userRoles = [] } = shopInfo;
  const onSubmit = async ({ updatedRoles }) => {
    await setRoles({ roles: updatedRoles, userId });
    return true;
  };
  const successMessage = formatMessage({
    id: 'role_updated',
    defaultMessage: 'Role updated successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      updatedRoles: [...(roles || [])],
    },
  });

  return (
    <Form form={form}>
      <ChoicesField
        key="user-roles"
        name="updatedRoles"
        labelClassName="flex items-center"
        inputClassName=""
        options={Object.fromEntries(userRoles.map((role) => [role, role]))}
        label={formatMessage({
          id: 'select_role',
          defaultMessage: 'Select role',
        })}
        placeholder={formatMessage({
          id: 'select_role',
          defaultMessage: 'Select role',
        })}
        multiple
      />
      <SubmitButton
        label={formatMessage({
          id: 'update_role',
          defaultMessage: 'Update role',
        })}
      />
    </Form>
  );
};

export default UserRolesView;
