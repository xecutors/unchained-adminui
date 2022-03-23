const FormWrapper = ({ children }) => {
  return (
    <div className="mt-5 sm:max-w-full">
      <div className="sm:px-15 bg-white pb-3 shadow sm:rounded-t">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
