import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

import Badge from '../../common/components/Badge';
import Button from '../../common/components/Button';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';
import Portal from '../../common/components/Portal';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts';

const Variation = ({ type, variation, selectedLocale, onDelete }) => {
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();
  const [isEdit, setIsEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const { formatMessage } = useIntl();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate menu position when showing menu
  const calculateMenuPosition = () => {
    if (!buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 192; // w-48 = 12rem = 192px
    const menuHeight = 80; // Approximate height for 2 menu items
    
    let top = buttonRect.bottom + 4; // 4px gap (mt-1)
    let left = buttonRect.right - menuWidth; // Align right edge with button
    
    // Ensure menu doesn't go off screen
    if (left < 8) left = 8; // 8px from left edge
    if (top + menuHeight > window.innerHeight - 8) {
      top = buttonRect.top - menuHeight - 4; // Show above button
    }
    
    setMenuPosition({ top, left });
  };

  const onSubmit: OnSubmitType = async ({ title, subtitle }) => {
    await updateProductVariationTexts({
      productVariationId: variation._id,
      texts: [{ title, subtitle, locale: selectedLocale }],
    });
    return { success: true };
  };

  const form = useForm({
    submit: onSubmit,
    initialValues: {
      title: variation?.texts?.title,
      subtitle: variation?.texts?.subtitle,
    },
  });

  return (
    <Form
      form={form}
      className="variation-update-form bg-white dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 w-full overflow-x-hidden overflow-y-visible relative"
      data-variationid={variation._id}
    >
      <div className="flex items-center justify-between w-full gap-3" tabIndex={-1}>
        <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
          {/* Title first on the left */}
          <div className="flex items-center gap-3">
            {isEdit ? (
              <TextField
                className="mt-0 py-1"
                name="title"
                required
                label={formatMessage({
                  id: 'title',
                  defaultMessage: 'Title',
                })}
              />
            ) : (
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-200 truncate">
                {variation?.texts?.title}
              </span>
            )}
          </div>

          {/* Options as tags in same row */}
          {variation?.options?.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              {variation.options.map((option, index) => (
                <span 
                  key={option.value || index}
                  className="inline-flex text-nowrap items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
                >
                  {option?.texts?.title || option.value}
                </span>
              ))}
            </div>
          )}

          {/* Subtitle if exists */}
          {(variation?.texts?.subtitle || isEdit) && (
            <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {isEdit ? (
                <TextField
                  className="mt-0 py-1"
                  name="subtitle"
                  label={formatMessage({
                    id: 'subtitle',
                    defaultMessage: 'Subtitle',
                  })}
                />
              ) : (
                variation?.texts?.subtitle
              )}
            </div>
          )}

          {/* Key for reference */}
          <div className="text-sm text-slate-400 dark:text-slate-500 font-mono">
            ({variation?.key})
          </div>
        </div>

        {/* Action menu on the right */}
        <div className="relative flex-shrink-0">
          {isEdit ? (
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEdit(!isEdit)}
                type="button"
                variant="secondary"
                size="sm"
                text={formatMessage({
                  id: 'cancel',
                  defaultMessage: 'Cancel',
                })}
              />
              <Button
                onClick={() => {
                  form.formik.submitForm();
                  setIsEdit(false);
                }}
                type="submit"
                variant="primary"
                size="sm"
                text={formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
              />
            </div>
          ) : (
            <>
              <button
                ref={buttonRef}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  if (!showMenu) {
                    calculateMenuPosition();
                  }
                  setShowMenu(!showMenu);
                }}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <EllipsisHorizontalIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
              
              {showMenu && (
                <Portal>
                  <div 
                    ref={menuRef}
                    className="fixed w-48 bg-white dark:bg-slate-800 rounded-md shadow-xl border border-slate-200 dark:border-slate-700 z-[9999]"
                    style={{
                      top: menuPosition.top,
                      left: menuPosition.left,
                      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          setIsEdit(true);
                          setShowMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <EditIcon className="mr-3" />
                        {formatMessage({
                          id: 'edit',
                          defaultMessage: 'Edit',
                        })}
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          onDelete(variation._id);
                          setShowMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <DeleteButton className="mr-3 !p-0 !m-0" />
                        {formatMessage({
                          id: 'delete',
                          defaultMessage: 'Delete',
                        })}
                      </button>
                    </div>
                  </div>
                </Portal>
              )}
            </>
          )}
        </div>
      </div>
    </Form>
  );
};

export default Variation;
