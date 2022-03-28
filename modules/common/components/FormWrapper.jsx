import classNames from 'classnames';

const FormWrapper = ({ children, className }) => {
  return (
    <div className="mt-5 sm:max-w-full">
      <div
        className={classNames(
          'sm:px-15 bg-white shadow sm:rounded-t',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
