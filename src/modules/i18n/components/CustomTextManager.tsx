import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useCustomText } from './CustomTextProvider';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Button from '../../common/components/Button';
import Modal from '../../modal/components/Modal';
import TextField from '../../forms/components/TextField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';

interface CustomTextFormData {
  key: string;
  text: string;
  category: 'help' | 'label' | 'general';
}

const CustomTextManager: React.FC = () => {
  const { formatMessage } = useIntl();
  const { customTexts, setCustomText, removeCustomText } = useCustomText();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingText, setEditingText] = useState<any>(null);

  const form = useForm<CustomTextFormData>({
    submit: async (values) => {
      setCustomText(values.key, values.text, values.category);
      setIsModalOpen(false);
      setEditingText(null);
      return { success: true };
    },
    initialValues: {
      key: editingText?.key || '',
      text: editingText?.text || '',
      category: editingText?.category || 'general',
    },
  });

  const handleEdit = (text: any) => {
    setEditingText(text);
    form.formik.setValues({
      key: text.key,
      text: text.text,
      category: text.category,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (text: any) => {
    if (
      confirm(
        formatMessage({
          id: 'confirm_delete_custom_text',
          defaultMessage: 'Are you sure you want to delete this custom text?',
        }),
      )
    ) {
      removeCustomText(text.key, text.category);
    }
  };

  const handleAddNew = () => {
    setEditingText(null);
    form.formik.resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-md dark:text-slate-400">
          {formatMessage({
            id: 'custom_texts_description',
            defaultMessage: 'Custom Texts',
          })}
        </h2>
        <Button
          onClick={handleAddNew}
          variant="primary"
          text={formatMessage({
            id: 'add_custom_text',
            defaultMessage: 'Add Custom Text',
          })}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {customTexts.length === 0 ? (
            <li className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
              {formatMessage({
                id: 'no_custom_texts',
                defaultMessage: 'No custom texts configured',
              })}
            </li>
          ) : (
            customTexts.map((text, index) => (
              <li
                key={`${text.key}-${text.category}-${index}`}
                className="px-6 py-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                        {text.key}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {text.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                      {text.text}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(text)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(text)}
                      className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
            {formatMessage({
              id: editingText ? 'edit_custom_text' : 'add_custom_text',
              defaultMessage: editingText
                ? 'Edit Custom Text'
                : 'Add Custom Text',
            })}
          </h3>
          <Form form={form} className="space-y-4">
            <TextField
              name="key"
              label={formatMessage({
                id: 'text_key',
                defaultMessage: 'Text Key',
              })}
              placeholder={formatMessage({
                id: 'text_key_placeholder',
                defaultMessage: 'e.g., welcome_message',
              })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {formatMessage({
                  id: 'category',
                  defaultMessage: 'Category',
                })}
              </label>
              <select
                {...form.formik.getFieldProps('category')}
                className="block w-full rounded-md border-1 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 py-2 px-3 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-slate-800"
              >
                <option value="general">
                  {formatMessage({
                    id: 'general',
                    defaultMessage: 'General',
                  })}
                </option>
                <option value="help">
                  {formatMessage({ id: 'help', defaultMessage: 'Help' })}
                </option>
                <option value="label">
                  {formatMessage({ id: 'label', defaultMessage: 'Label' })}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {formatMessage({
                  id: 'custom_text',
                  defaultMessage: 'Custom Text',
                })}
              </label>
              <textarea
                {...form.formik.getFieldProps('text')}
                rows={4}
                className="block w-full rounded-md border-1 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 py-2 px-3 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-800"
                placeholder={formatMessage({
                  id: 'custom_text_placeholder',
                  defaultMessage: 'Enter your custom text here...',
                })}
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="quaternary"
                text={formatMessage({
                  id: 'cancel',
                  defaultMessage: 'Cancel',
                })}
              />
              <Button
                type="submit"
                variant="primary"
                text={formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
              />
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CustomTextManager;
