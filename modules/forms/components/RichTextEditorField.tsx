import classnames from 'classnames';

import dynamic from 'next/dynamic';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateRequiredTextArea } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditorField = ({ ...props }: FieldHookProps) => {
  const field = useField({
    validators: [validateRequiredTextArea(props.required)],
    ...props,
  });

  return (
    <FieldWrapper {...field}>
      <ReactQuill
        className={classnames(
          'mt-1 rounded-md rounded-b-md border-2 border-slate-100 sm:text-xs',
          props.className,
          {
            'quill-error-border': !!field.error,
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
