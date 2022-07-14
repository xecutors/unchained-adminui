import classNames from 'classnames';

const AccordionHeader = ({ name, className }) => {
  return (
    <div
      className={classNames(
        'mr-4 text-base capitalize font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold',
        className,
      )}
    >
      {name}
    </div>
  );
};

export default AccordionHeader;
