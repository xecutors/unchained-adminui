import classnames from 'classnames';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDate, validateRequiredTextArea } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const RichTextEditorField = ({ ...props }: FieldHookProps) => {
  const field = useField({
    validators: [validateRequiredTextArea(props.required)],
    ...props,
  });
  

  return (
    <FieldWrapper {...field}>
      <ReactQuill
        className={classnames(
          'mt-3 rounded-md rounded-b-md border border-gray-300 px-4 py-2 sm:text-xs',
          props.className,
          {
            'quill-border': !!field.error,
          },
        )}
        id={field.id}
        onChange={(val) => field.setValue(val)}
        value={field.value}
      />
    </FieldWrapper>
  );
};

export default RichTextEditorField;
