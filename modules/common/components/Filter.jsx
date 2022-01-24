import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED'];

const Filter = () => {
  const { formatMessage } = useIntl();
  const [showFilters, setShowfilters] = useState(true);
  const [check, setCheck] = useState({
    leather: false,
    cotton: false,
    fabric: false,
    crocodile: false,
    wool: false,
    large: false,
    medium: false,
    small: false,
    mini: false,
    luxesignatire: false,
    luxelondon: false,
  });

  const {
    leather,
    cotton,
    fabric,
    crocodile,
    wool,
    luxesignatire,
    luxelondon,
  } = check;

  const changeHandler = (e) => {
    setCheck({
      ...check,
      [e.target.name]: e.target.checked,
    });
  };

  const applyFilters = () => {
    setCheck({
      ...check,
    });
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <button
        type="button"
        onClick={() => setShowfilters(!showFilters)}
        className=" cursor-pointer sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center "
      >
        Filters
      </button>

      <button
        type="button"
        onClick={() => setShowfilters(!showFilters)}
        className="cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center"
      >
        Filters
      </button>

      <div
        id="filterSection"
        className={`relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full ${
          showFilters ? 'block' : 'hidden'
        }`}
      >
        <div
          onClick={() => setShowfilters(false)}
          className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4"
        >
          <svg
            className=" lg:w-6 lg:h-6 w-4 h-4"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 1L1 25"
              stroke="#1F2937"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L25 25"
              stroke="#27272A"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Material
            </p>
          </div>
          <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
            <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="Leather"
                name="leather"
                value="Leather"
                checked={leather}
                onChange={changeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="Leather"
                  >
                    Leather
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="Cotton"
                name="cotton"
                value="Cotton"
                checked={cotton}
                onChange={changeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="Cotton"
                  >
                    Cotton
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-end">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="Fabric"
                name="fabric"
                value="Fabric"
                checked={fabric}
                onChange={changeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="Fabric"
                  >
                    Fabric
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="Crocodile"
                name="crocodile"
                value="Crocodile"
                checked={crocodile}
                onChange={changeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="Crocodile"
                  >
                    Crocodile
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="Wool"
                name="wool"
                value="Wool"
                checked={wool}
                onChange={changeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="Wool"
                  >
                    Wool
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div>
          <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
            {formatMessage({ id: 'status', defaultMessage: 'Status' })}
          </p>

          <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
            {WORK_STATUSES.map((status) => (
              <div className=" flex md:justify-center md:items-center items-center">
                <input
                  className="w-4 h-4 mr-2"
                  type="checkbox"
                  id={status}
                  name={status}
                  value={status}
                  checked={check[status]}
                  onChange={changeHandler}
                />
                <div className=" inline-block">
                  <div className=" flex space-x-6 justify-center items-center">
                    <label
                      className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                      htmlFor={status}
                    >
                      {status}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 7H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 4V10"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Collection
            </p>
          </div>
          <div className=" flex mt-8 space-x-8">
            <div className=" flex justify-center items-center">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="LS"
                name="luxesignatire"
                value="LS"
                checked={luxesignatire}
                onChange={changeHandler}
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="LS"
                  >
                    Luxe signature
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <input
                className="w-4 h-4 mr-2"
                type="checkbox"
                id="LxL"
                name="luxelondon"
                checked={luxelondon}
                onChange={changeHandler}
                value="LxL"
              />
              <div className=" inline-block">
                <div className=" flex space-x-6 justify-center items-center">
                  <label
                    className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor="LxL"
                  >
                    Luxe x London
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6">
          <button
            type="button"
            onClick={applyFilters}
            className="w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
