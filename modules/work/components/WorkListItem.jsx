import { useIntl } from 'react-intl';
import Link from 'next/link';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

import { WORK_STATUSES } from '../../common/data/miscellaneous';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import useCalculateScheduledTime from '../hooks/useCalculateScheduledTime';

const WorkListItem = ({ work }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { getScheduledTime, getDuration } = useCalculateScheduledTime();

  const options = {
    dateStyle: 'short',
    timeStyle: 'short',
  };

  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm">
          <Link href={`/works/${work._id}`}>
            <a className="text-blue-600 dark:text-blue-400">
              {work?.type || (
                <>
                  {work._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'type', defaultMessage: 'Type' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell>
        <Badge text={work?.status} color={WORK_STATUSES[work.status]} square />
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm">
          {work.created ? formatDateTime(work.created, options) : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm">
          {getScheduledTime(work, new Date().getTime())}{' '}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm">
          {work.started ? formatDateTime(work.started, options) : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm">
          {work.finished ? formatDateTime(work.finished, options) : 'n/a'}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center text-sm">{getDuration(work)}</div>
      </Table.Cell>
    </Table.Row>
  );
};

export default WorkListItem;
