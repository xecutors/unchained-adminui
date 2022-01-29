import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { useState } from 'react';

const Accordion = ({ data, containerCSS, headerCSS, bodyCSS }) => {
  return (
    <div className={classNames('', containerCSS)}>
      {data.map(({ header, body }, key) => (
        <AccordionItem
          header={header}
          body={body}
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          headerCSS={headerCSS}
          bodyCSS={bodyCSS}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ header, body, headerCSS, bodyCSS }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div
        onClick={() => setShow(!show)}
        className={classNames(
          'border text-gray-500 rounded-lg cursor-pointer pl-5  hover:bg-gray-100',
          headerCSS,
        )}
      >
        <div>{header}</div>
        <span>
          {' '}
          {show ? (
            <ArrowCircleDownIcon
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            />
          ) : (
            <ArrowCircleUpIcon
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            />
          )}{' '}
        </span>
      </div>

      {show ? (
        <div className={classNames(' p-0 text-gray-400 rounded-lg', bodyCSS)}>
          {body}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Accordion;
