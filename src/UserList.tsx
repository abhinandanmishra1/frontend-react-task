import React, {useState} from 'react';
import {useQuery} from 'react-query';
import UserRow from './UserRow';
import {User} from './Interface';
import {BsArrowDown} from 'react-icons/bs';

import {
  HiArrowLongLeft,
  HiArrowLongRight,
  HiOutlineCloudArrowDown,
} from 'react-icons/hi2';

import {IoAddOutline} from 'react-icons/io5';

import Modal from './Modal';
import ReactPaginate from 'react-paginate';

const UserList: React.FC = () => {
  const {data, status} = useQuery<User[], Error>(
    'users',
    async () => {
      const res = await fetch(
        'https://mockend.com/abhinandanmishra1/mockApi/users'
      );
      return await res.json();
    },
    {
      // Query options, e.g. caching settings
    }
  );

  const defaultUser: User = {
    name: '',
    email: '',
    role: '',
    avatarUrl: '',
    id: data ? data.length : 1,
    status: '',
    lastLogin: '',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<User>(defaultUser);
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const items = data || [];
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const handleEdit = (user: User) => {
    setUserData(user);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setUserData(defaultUser);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error...</p>;
  }

  return (
    <div className="w-full h-full p-4">
      <div
        className={`w-3/4 p-3 relative shadow-md sm:rounded-lg m-auto ${
          modalOpen ? 'opacity-30' : ''
        }`}
      >
        <div className="w-full flex justify-between p-2">
          <div>
            <div className="flex items-center">
              <h4 className="mr-2">Users</h4>
              <p className="text-xs text-green-800 bg-green-100 p-1 px-1.5 rounded-full">
                48 users
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Manage Your Team Members and their account permissions here
            </p>
          </div>
          <div className="flex ">
            <button className="flex border py-1 px-2 items-center text-sm rounded-lg mr-2 text-gray-500 hover:text-gray-700 font-medium">
              <HiOutlineCloudArrowDown className="mr-1" />
              Download CSV
            </button>
            <button
              onClick={handleCreate}
              className="flex border py-1 px-2 font-medium items-center text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-700"
            >
              <IoAddOutline className="mr-1" />
              Add User
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 w-full">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 w-1/3">
                <p className="inline-block">Name </p>
                <BsArrowDown className="inline-block text-md" />
              </th>
              <th scope="col" className="px-6 py-3">
                <p className="inline-block">Status</p>
                <BsArrowDown className="inline-block text-md" />
              </th>
              <th scope="col" className="px-6 py-3">
                <p className="inline-block">Role</p>
                <BsArrowDown className="inline-block text-md" />
              </th>
              <th scope="col" className="px-6 py-3">
                <p className="inline-block">Last Login</p>
                <BsArrowDown className="inline-block text-md" />
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {currentItems &&
              currentItems.map(user => (
                <UserRow user={user} handleEdit={handleEdit} key={user.id} />
              ))}
          </tbody>
        </table>
        <div className="navigation">
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <div className="next-label">
                Next
                <HiArrowLongRight className="next-arrow" />
              </div>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <div className="previous-label">
                <HiArrowLongLeft className="previous-arrow" />
                Previous
              </div>
            }
          />
        </div>
      </div>
      <Modal isOpen={modalOpen} user={userData} handleClose={handleClose} />
    </div>
  );
};

export default UserList;
