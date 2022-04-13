import classNames from 'classnames';
import { CommonFieldProps } from '../../forms/hooks/useField';

const JSONView = ({
  value,
  className,
  onChange = () => {},
  ...props
}: CommonFieldProps) => {
  return (
    <textarea
      className={classNames(
        'text-black dark:bg-slate-600 dark:text-white border-slate-200',
        className,
      )}
      value={value}
      onChange={onChange}
      rows={Math.max((value || ' ')?.split(' ')?.length / 8, 8)}
      {...props}
    />
  );
};

export default JSONView;
