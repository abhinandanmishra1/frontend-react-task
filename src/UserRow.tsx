import React, {useCallback} from 'react';
import moment from 'moment';
import {RiDeleteBin5Line} from 'react-icons/ri';
import {FiEdit2} from 'react-icons/fi';
import {UserRowProps} from './Interface';

const UserRow: React.FC<UserRowProps> = ({user, handleEdit}) => {
  const badgeTextColor =
    user.status === 'Active' ? 'text-green-800' : 'text-gray-800';
  const badgeDotColor =
    user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500';
  const badgeBgColor =
    user.status === 'Active' ? 'bg-green-100' : 'bg-gray-100';

  return (
    <tr className="bg-white hover:bg-gray-50">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-3"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="checkbox-table-search-3" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-1/3"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={user.avatarUrl}
          alt={user.name}
        />
        <div className="pl-3">
          <div className="text-base font-semibold">{user.name}</div>
          <div className="font-normal text-gray-500">{user.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <div
          className={`flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${badgeTextColor} ${badgeBgColor} `}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full mr-2 ${badgeDotColor}`}
          ></div>{' '}
          {user.status}
        </div>
      </td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">{user.lastLogin}</td>
      <td className="px-6">
        <RiDeleteBin5Line className="cursor-pointer text-lg font-medium inline-block mr-2" />
        <FiEdit2
          className="cursor-pointer text-lg font-medium inline-block ml-2"
          onClick={() => handleEdit(user)}
        />
      </td>
    </tr>
  );
};

export default UserRow;
