import { useIntl } from 'react-intl';
import AssortmentLinkForm from './AssortmentLinkForm';

const AssortmentLinks = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="mt-4 sm:max-w-full">
      <div className="py-2 px-5 shadow sm:rounded-t sm:px-15">
        <div className="space-y-2 sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
          <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'links',
                defaultMessage: 'Links',
              })}
            </h3>
          </div>

          <div className="col-span-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
            <AssortmentLinkForm assortmentId={assortmentId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentLinks;
