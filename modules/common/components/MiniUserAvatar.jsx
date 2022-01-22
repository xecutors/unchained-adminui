const MiniUserAvatar = ({ name = '', url = '', showName = true } = {}) => {
  return (
    <div className="flex-col ">
      <div>
        {!url ? (
          <span className="flex items-center m-auto self-center justify-center h-8 w-8 rounded-full bg-gray-500">
            <span className="text-center text-sm font-medium leading-none text-white">
              {name
                ?.split(' ')
                .map((n) => n[0]?.toUpperCase())
                .join('')}
            </span>
          </span>
        ) : (
          <img
            className="inline-block h-9 w-9 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        )}
      </div>
      {name && showName && (
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {name}
          </p>
        </div>
      )}
    </div>
  );
};

export default MiniUserAvatar;
