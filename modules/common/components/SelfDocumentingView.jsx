import classNames from 'classnames';

const SelfDocumentingView = ({
  documentationLabel,
  documentation,
  mainContent,
  sideComponents,
  className,
  children,
}) => {
  return (
    <div
      className={classNames(
        'md:grid md:grid-cols-3 md:gap-6 mt-2 sm:mt-0',
        className,
      )}
    >
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-200">
            {documentationLabel}
          </h3>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-200">
            {documentation}
          </div>
          {sideComponents}
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        {children || mainContent}
      </div>
    </div>
  );
};

export default SelfDocumentingView;
