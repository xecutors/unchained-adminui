import classNames from 'classnames';

const FormWrapper = ({ children, className = '' }) => {
  return (
    <div className="mt-5 sm:max-w-full">
      <div
        className={classNames(
          'bg-white dark:bg-slate-800 rounded-lg',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
