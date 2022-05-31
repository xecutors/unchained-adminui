import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';
import useSystemRoles from '../../common/hooks/useSystemRoles';
import ChoicesField from '../../forms/components/ChoicesField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';

import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

import useSetRoles from '../hooks/useSetRoles';

const UserRolesView = ({ roles, userId }) => {
  const { formatMessage } = useIntl();

  const { setRoles } = useSetRoles();
  const { hasRole } = useAuth();
  const { systemRoles } = useSystemRoles();
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
        labelClassName="flex items-center mt-1"
        choiceContainerClassName="flex"
        inputClassName="ml-2"
        options={Object.fromEntries(
          (systemRoles || []).map((role) => [role, role]),
        )}
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
      <FormErrors />

      <SubmitButton
        disabled={!hasRole(ACTION_ROLES.users.updateRoles)}
        label={formatMessage({
          id: 'update_role',
          defaultMessage: 'Update role',
        })}
      />
    </Form>
  );
};

export default UserRolesView;
