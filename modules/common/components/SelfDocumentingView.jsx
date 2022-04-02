import classNames from 'classnames';

const SelfDocumentingView = ({
  documentationLabel,
  documentation,
  mainContent,
  sideComponents,
  className,
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
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {documentationLabel}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{documentation}</p>
          {sideComponents}
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">{mainContent}</div>
    </div>
  );
};

export default SelfDocumentingView;
