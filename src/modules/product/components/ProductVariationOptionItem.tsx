import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';
import Portal from '../../common/components/Portal';

import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts';

const ProductVariationOptionItem = ({
  option,
  onDelete,
  variationId,
  selectedLocale,
}) => {
  const { formatMessage } = useIntl();
  const [isEdit, setIsEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const successMessage = formatMessage({
    id: 'variation_option_updated',
    defaultMessage: 'Variation option updated successfully!',
  });
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();

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

  const onUpdate = async ({ title, subtitle }: any) => {
    const data = await updateProductVariationTexts({
      productVariationId: variationId,
      productVariationOptionValue: option.value,
      texts: [{ title, subtitle, locale: selectedLocale }],
    });
    setIsEdit(false);
    return { data, success: true };
  };
  const form = useForm({
    submit: onUpdate,
    successMessage,
    initialValues: {
      title: option?.texts.title,
      subtitle: option?.texts.subtitle,
    },
  });
  return (
    <Form
      form={form}
      className="last:pb-2 variation-option-update-form relative overflow-visible"
    >
      <div className="my-2 rounded-sm border mx-4 ">
        <div className="p-2 bg-white dark:bg-slate-500 dark:text-slate-200">
          <div className="flex gap-2 w-full items-center justify-between">
            <Badge
              text={option?.texts?.title}
              color="slate"
              className="rounded-md"
            />
            <div className="flex items-center gap-4 w-full">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-200">
                {isEdit ? (
                  <TextField
                    className="mt-0"
                    name="title"
                    required
                    label={formatMessage({
                      id: 'title',
                      defaultMessage: 'Title',
                    })}
                  />
                ) : (
                  option?.value
                )}
              </p>
              <p className="truncate text-sm text-slate-500">
                {isEdit ? (
                  <TextField
                    className="mt-0"
                    name="subtitle"
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                  />
                ) : (
                  option?.texts?.subtitle
                )}
              </p>
            </div>
            <div className="flex items-center justify-end ml-auto">
              {isEdit ? (
                <div className="flex space-x-2 py-2">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    aria-label={formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                    type="button"
                    className="inline-flex items-center justify-center font-medium shadow-sm focus:outline-hidden focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 text-sm h-8 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-slate-500"
                  >
                    {formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                  </button>

                  <button
                    type="submit"
                    aria-label={formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                    className="inline-flex items-center justify-center font-medium shadow-sm focus:outline-hidden focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 text-sm h-8 rounded-md border border-slate-800 dark:border-slate-600 bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-900 dark:hover:bg-slate-500 focus:ring-slate-800 dark:focus:ring-slate-400"
                  >
                    {formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                  </button>
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
                          boxShadow:
                            '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
                              onDelete(option.value);
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
        </div>
      </div>
    </Form>
  );
};

export default ProductVariationOptionItem;
