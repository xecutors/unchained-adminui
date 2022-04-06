import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import Link from 'next/link';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

import { WORK_STATUSES } from '../../common/data/miscellaneous';

const WorkListItem = ({ work }) => {
  const { formatMessage } = useIntl();

  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          <Link href={`/works/${work._id}`}>
            <a className="text-blue-600">
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
        <div className="flex items-center text-sm text-slate-900">
          {work.created
            ? format(new Date(work.created), 'yyyy-MM-dd HH:mm')
            : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          {work.scheduled
            ? format(new Date(work.scheduled), 'yyyy-MM-dd HH:mm')
            : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          {work.started
            ? format(new Date(work.started), 'yyyy-MM-dd HH:mm')
            : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          {work.finished
            ? format(new Date(work.finished), 'yyyy-MM-dd HH:mm')
            : 'n/a'}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default WorkListItem;
