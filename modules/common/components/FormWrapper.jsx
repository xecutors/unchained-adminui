import classNames from 'classnames';

const FormWrapper = ({ children, className }) => {
  return (
    <div className="sm:max-w-full">
      <div
        className={classNames(
          'sm:px-15 rounded-md bg-white dark:bg-slate-600 shadow dark:shadow-white',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
