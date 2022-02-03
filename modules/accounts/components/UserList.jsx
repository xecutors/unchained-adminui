import UserListItem from './UserListItem';

const UserList = ({ users }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden">
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
