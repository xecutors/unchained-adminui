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
    <div>
      <div className="pb-3 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({ id: 'roles', defaultMessage: 'Roles' })}
        </h3>
      </div>
      <Form form={form}>
        <ChoicesField
          key="user-roles"
          name="updatedRoles"
          labelClassName="flex flex-col items-center "
          options={Object.fromEntries(userRoles.map((role) => [role, role]))}
          label={formatMessage({
            id: 'select_role',
            defaultMessage: 'Select role',
          })}
          className="flex flex-wrap"
          hideLabel
          multiple
        />
        <SubmitButton
          label={formatMessage({ id: 'Update', defaultMessage: 'Update role' })}
        />
      </Form>
    </div>
  );
};

export default UserRolesView;
