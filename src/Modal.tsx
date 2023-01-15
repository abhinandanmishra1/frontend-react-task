import React, {useEffect, useState} from 'react';
import {ModalProps} from './Interface';
import {IoCloseOutline} from 'react-icons/io5';

const Modal: React.FC<ModalProps> = ({user, isOpen, handleClose}) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed top-1/2 left-1/2 z-50 w-3/4 m-auto p-4 md:inset-0 h-modal md:h-full"
        >
          <div className="relative w-11/12 m-auto h-full max-w-md">
            <div className="relative bg-white rounded-lg shadow m-auto top-1/4">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={handleClose}
              >
                <IoCloseOutline className="text-lg font-medium" />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  {user.name !== '' ? 'Edit User' : 'Create User'}
                </h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={formData.name || 'John Doe'}
                      onChange={e =>
                        setFormData({...formData, name: e.target.value})
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={formData.email || 'name@company.com'}
                      onChange={e =>
                        setFormData({...formData, email: e.target.value})
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      value={formData.role || 'Software Engineer'}
                      onChange={e =>
                        setFormData({...formData, role: e.target.value})
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {user.name !== '' ? 'Update User' : 'Create User'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
