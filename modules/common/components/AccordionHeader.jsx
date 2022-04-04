import classNames from 'classnames';
import { useIntl } from 'react-intl';

const AccordionHeader = ({ name, className }) => {
  const { formatMessage } = useIntl();
  return (
    <div
      className={classNames(
        'mr-4 text-base capitalize font-semibold text-slate-500 sm:text-lg sm:font-bold',
        className,
      )}
    >
      {formatMessage({
        id: `${name}`,
        defaultMessage: `${name}`,
      })}
    </div>
  );
};

export default AccordionHeader;
