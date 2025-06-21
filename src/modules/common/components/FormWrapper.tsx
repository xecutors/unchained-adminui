import classNames from 'classnames';

const FormWrapper = ({ children, className = '' }) => {
  return (
    <div className="sm:max-w-full">
      <div
        className={classNames(
          'rounded-md bg-white dark:bg-slate-800 shadow-sm rounded-lg',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
