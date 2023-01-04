import useFormatDateTime from '../utils/useFormatDateTime';
import Toggle from './Toggle';

function isBoolean(value) {
  try {
    return typeof JSON.parse(value) === 'boolean';
  } catch {
    return false;
  }
}

const isValidDate = (dateString) => {
  return (
    !Number.isNaN(Date.parse(dateString)) && Number.isNaN(Number(dateString))
  );
};

const DisplayData = ({ value }) => {
  const { formatDateTime } = useFormatDateTime();

  if (isBoolean(value)) return <Toggle disabled active={JSON.parse(value)} />;

  if (isValidDate(value))
    return formatDateTime(value, {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  if (!Number.isNaN(value)) return value;
  return value;
};

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
          <div
            key={key}
            className="divide-y  rounded-md border border-slate-200 p-2"
          >
            {value.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 ml-2"
              >
                <DisplayData value={item} />
              </span>
            ))}
          </div>,
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
            <DisplayData value={value} />
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
            <DisplayData value={value} />
          </dd>
        </div>,
      );
    }
  });

  return (
    <div className="border-t bg-white border-slate-200 px-4 py-5 ">
      <dl className="sm:divide-y sm:divide-slate-200">{elements}</dl>
    </div>
  );
};

export default DisplayExtendedFields;
