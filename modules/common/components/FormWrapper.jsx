const FormWrapper = ({ children }) => {
  return (
    <div className="mt-5 sm:max-w-full">
      <div className="bg-white shadow sm:rounded-t sm:px-15">{children}</div>
    </div>
  );
};

export default FormWrapper;
