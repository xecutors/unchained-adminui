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
          ' relative mt-3 block w-full appearance-none rounded-md rounded-b-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-xs',
          props.className,
          {
            'hhhhhhhhhhhhhhhh': !!field.error,
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
