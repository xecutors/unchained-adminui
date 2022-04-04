import { CommonFieldProps } from '../../forms/hooks/useField';

const JSONView = ({ value, ...props }: CommonFieldProps) => {
  return (
    <textarea
      value={value}
      rows={
        props.rows ||
        Math.max(
          JSON.stringify(props?.value || {}, null, 2)?.split(' ')?.length / 5,
          5,
        )
      }
      {...props}
    />
  );
};

export default JSONView;
