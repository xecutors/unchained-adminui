import { ExclamationIcon } from '@heroicons/react/solid';
import classnames from 'classnames';

const NoData = ({ message, className="", icon }) => {
  const Icon = icon || ExclamationIcon;
  return (
    <div className={classnames("w-full border-2", className)}>
      <div className="grid justify-center items-center">
        <div className="flex justify-center items-center">
          <Icon className="h-10 w-10" />
        </div>
        <p className="flex justify-center items-center m-auto">
          No &nbsp;<span className="capitalize">{message}&nbsp;available</span>
        </p>
      </div>
    </div>
  );
};

export default NoData;
