const DisplayExtendedFields = (props) => {
  const { data, parentKey } = props;
  if (!data) return null;

  const keys = Object.keys(data);
  const elements = [];

  if (parentKey !== undefined) {
    elements.push(
      <h2 key={parentKey} className="text-lg font-medium text-slate-900">
        {parentKey}
      </h2>,
    );
  }

  keys.forEach((key) => {
    const value = data[key];

    if (Array.isArray(value)) {
      elements.push(
        <h2 key={parentKey} className="text-lg font-medium text-slate-900">
          {key}
        </h2>,
      );
      if (value.every((v) => typeof v === 'string' || typeof v === 'number')) {
        elements.push(
          <ul
            key={key}
            className="divide-y divide-slate-200 rounded-md border border-slate-200"
          >
            {value.map((item) => (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={item}
                className="flex items-center text-slate-600  justify-between py-3 pl-3 pr-4 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>,
        );
      } else {
        const listItems = [];
        value.forEach((item, i) => {
          listItems.push(
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="flex items-center text-slate-600  justify-between py-3 pl-3 pr-4 text-sm"
            >
              {DisplayExtendedFields({ data: item, parentKey: i })}
            </li>,
          );
        });
        elements.push(
          <ul
            key={key}
            className="divide-y divide-slate-200 rounded-md border border-slate-200"
          >
            {listItems}
          </ul>,
        );
      }
    } else if (typeof value === 'object') {
      elements.push(DisplayExtendedFields({ data: value, parentKey: key }));
    } else if (parentKey === undefined) {
      elements.push(
        <div key={key} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-slate-700">{key}</dt>
          <dd className="mt-1 text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            {value}
          </dd>
        </div>,
      );
    } else {
      elements.push(
        <div
          key={key}
          className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
        >
          <dt className="text-sm font-medium text-slate-700">{key}</dt>
          <dd className="mt-1 text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            {value}
          </dd>
        </div>,
      );
    }
  });

  return (
    <div className="border-t bg-white border-slate-200 px-4 py-5 sm:p-0">
      <dl className="sm:divide-y sm:divide-slate-200">{elements}</dl>
    </div>
  );
};

export default DisplayExtendedFields;
