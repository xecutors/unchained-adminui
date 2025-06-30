import UserListItem from './UserListItem';

const UserList = ({ users }) => {
  return (
    <div className="mt-5 flex flex-col dark:rounded-md dark:border-slate-800">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <ul>
            {users?.map((person) => (
              <UserListItem key={person?._id} user={person} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
