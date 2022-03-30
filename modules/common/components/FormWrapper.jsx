const FormWrapper = ({ children }) => {
  return (
    <div className="mt-5 sm:max-w-full">
      <div className="sm:px-15 rounded-md bg-white shadow">{children}</div>
    </div>
  );
};

export default FormWrapper;
