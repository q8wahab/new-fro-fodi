import React, { Fragment, useContext, useState } from "react";
import Modal from "./Modal";
import { register } from "../api/auth";
import UserContext from "../Context/userContext";
import { useMutation } from "@tanstack/react-query";

const RegisterButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(userInfo).forEach((key) => {
      formData.append(key, userInfo[key]);
    });

    mutate(formData);
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (formData) => register(formData),
    onSuccess: () => {
      setUser(true);
      setShowModal(false);
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });

  if (user) return null;

  return (
    <Fragment>
      <div
        className="w-22 h-9 px-10 py-2 rounded shadow border border-emerald-700 flex justify-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="text-emerald-700 text-sm font-normal font-['Syne'] uppercase leading-tight">
          Register
        </div>
      </div>
      <Modal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up for an account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="text"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="image"
                  className="block text-gray-900 text-sm font-medium mb-2"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default RegisterButton;
