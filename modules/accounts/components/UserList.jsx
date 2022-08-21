import UserListItem from './UserListItem';

const UserList = ({ users }) => {
  return (
    <div className="flex flex-col  dark:rounded-md dark:border-slate-800">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white dark:bg-slate-900 border-none">
            <ul>
              {users?.map((person) => (
                <UserListItem key={person?._id} user={person} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
