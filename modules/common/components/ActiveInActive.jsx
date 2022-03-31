import React from 'react';
import { BadgeCheckIcon, XCircleIcon } from '@heroicons/react/solid';

const ActiveInActive = ({ isActive }) => {
  return (
    <span className="inline-flex self-end">
      {isActive ? (
        <BadgeCheckIcon className="text-green-500 w-4 h-4" />
      ) : (
        <XCircleIcon className="text-red-500 w-4 h-4" />
      )}
    </span>
  );
};

export default ActiveInActive;
