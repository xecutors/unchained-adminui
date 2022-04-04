import { CommonFieldProps } from '../../forms/hooks/useField';

const JSONView = ({ ...props }: CommonFieldProps) => {
  return (
    <textarea
      disabled={props.disabled}
      className={props.className}
      id={props.name}
      name={props.name}
      onChange={props.handleOnChange}
      onBlur={props.handleOnBlur}
      value={props.value}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      rows={
        props.rows ||
        Math.max(
          JSON.stringify(props.value || {}, null, 2)?.split(' ')?.length / 5,
          5,
        )
      }
    />
  );
};

export default JSONView;
