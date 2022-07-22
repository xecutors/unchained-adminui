import classNames from 'classnames';

import Select from 'react-select';
import FieldWrapper from '../../forms/components/FieldWrapper';
import { TextFieldProps } from '../../forms/components/TextField';
import useField from '../../forms/hooks/useField';

interface FilterableData {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  image?: string;
}

interface FilterableDropdownProps extends TextFieldProps {
  data?: FilterableData[];
  onFilter?: any;
}

const FilterableDropdown = ({
  data,
  onFilter,
  ...props
}: FilterableDropdownProps) => {
  const field = useField({ ...props });

  return (
    <div className="relative flex flex-col items-center dark:text-slate-900">
      <div className="w-full">
        <div
          className={classNames(
            'my-2 flex items-center rounded border-slate-200 dark:border-slate-800 p-1',
            props.className,
          )}
        >
          <div className="w-full">
            <FieldWrapper {...field}>
              <Select
                isDisabled={!!field.disabled}
                id={field.id}
                name={field.name}
                onBlur={field.onBlur}
                onInputChange={onFilter}
                onChange={(e) => {
                  field.setValue(e.value, true);
                }}
                placeholder={field.placeholder}
                options={data?.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
              />
            </FieldWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableDropdown;
