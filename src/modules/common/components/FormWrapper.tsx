import classNames from 'classnames';

const FormWrapper = ({ children, className = '' }) => {
  return (
    <div className="sm:max-w-full">
      <div
        className={classNames(
          'bg-white dark:bg-slate-800 rounded-lg shadow-sm',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
