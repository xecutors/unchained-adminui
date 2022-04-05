import { CommonFieldProps } from '../../forms/hooks/useField';

const JSONView = ({ value, ...props }: CommonFieldProps) => {
  return (
    <textarea
      value={value}
      rows={Math.max((value || ' ')?.split(' ')?.length / 8, 8)}
      {...props}
    />
  );
};

export default JSONView;
