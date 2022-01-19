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
  const form = useForm({
    submit: onSubmit,
    initialValues: {
      updatedRoles: [...(roles || [])],
    },
  });

  return (
    <Form form={form}>
      <ChoicesField
        key="user-roles"
        name="updatedRoles"
        options={Object.fromEntries(userRoles.map((role) => [role, role]))}
        label="Roles"
        multiple
      />
      <SubmitButton
        className="mb-5 mt-5 mr-2 text-center items-center px-3 py-1 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
        label={formatMessage({ id: 'Update', defaultMessage: 'Update role' })}
      />
    </Form>
  );
};

export default UserRolesView;
