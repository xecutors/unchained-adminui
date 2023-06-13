import classnames from 'classnames';
import TagInput from '../../common/components/TagInput';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateRequiredTag } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const TagInputField = ({
  buttonText = '',
  validators = [],
  ...props
}: FieldHookProps) => {
  const field = useField({
    validators: [...validators, validateRequiredTag(props?.required)],
    label: 'Tags',
    placeholder: 'Tags',
    ...props,
  });

  return (
    <FieldWrapper {...field}>
      <TagInput
        disabled={field.disabled}
        id={field.id}
        name={field.name}
        className={classnames({
          'border-red-300': !!field.error,
        })}
        onChange={(value) => field.setValue(value)}
        placeholder={field.placeholder}
        tagList={field.value}
        buttonText={buttonText}
      />
    </FieldWrapper>
  );
};

export default TagInputField;
