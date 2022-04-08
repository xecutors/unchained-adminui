const FormWrapper = ({ children }) => {
  return (
    <div className="sm:max-w-full">
      <div className="sm:px-15 rounded-md bg-white dark:bg-slate-600 shadow dark:shadow-white">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
