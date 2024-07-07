import React, { Fragment, useContext } from "react";

import { NavLink } from "react-router-dom";
import UserContext from "../Context/userContext";

import LogInButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

const NavBar = () => {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  return (
    <Fragment>
      <div className="w-full h-[72px] flex justify-center bg-white items-center  p-9">
        <div className="justify-start items-center gap-2 flex cursor-pointer">
          <div className=" flex justify-start items-center space-x-6 px-20 ">
            <div className="rounded-md bg-green-700  text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition  ease-in-out  delay-50  hover:-translate-y-1">
              <RegisterButton />
            </div>

            <LogInButton name={"LogIn"} />
            <div className=" flex justify-start items-center space-x-6 px-20 ">
              {user && (
                <>
                  <NavLink
                    to="/"
                    className="text-blue-500 text-base font-bold font-['Syne'] leading-tight"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="text-blue-500 text-base font-bold font-['Syne'] leading-tight"
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/list"
                    className="text-blue-500 text-base font-bold font-['Syne'] leading-tight"
                  >
                    list of Recipes
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
        <div className=" text-blue-950 text-4xl font-normal font-['Yuji Syuku'] flex justify-start items-start w-full">
          Kuwait street food
        </div>
        <div className="text-emerald-700 text-base font-bold font-['Syne'] leading-tight transition  ease-in-out rounded-md  delay-50 hover:-translate-y-1"></div>
      </div>
    </Fragment>
  );
};

export default NavBar;
