import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Ensure this is imported
import UserContext from "../Context/userContext";
import LogInButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { me } from "../api/auth";

const NavBar = () => {
  const [user] = useContext(UserContext);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => me(user?.id),
    enabled: !!user, // Only run the query if the user is logged in
  });

  return (
    <Fragment>
      <div className="w-full h-[72px] flex justify-between bg-white items-center p-6">
        <div className="flex justify-start items-center gap-6">
          <div className="rounded-md bg-green-700 text-white shadow-sm hover:bg-green-600 transition ease-in-out delay-50 hover:-translate-y-1">
            <RegisterButton />
          </div>
          <LogInButton name={"LogIn"} />
          {user && (
            <>
              <NavLink
                to="/"
                className="text-blue-500 text-base font-bold leading-tight"
              >
                Home
              </NavLink>
              <NavLink
                to="/profile"
                className="text-blue-500 text-base font-bold leading-tight"
              >
                Profile
              </NavLink>
              <NavLink
                to="/list"
                className="text-blue-500 text-base font-bold leading-tight"
              >
                List of All Recipes
              </NavLink>
              <NavLink
                to={`/user/${profileData?._id}`}
                className="text-blue-500 text-base font-bold leading-tight"
              >
                List of User Recipes
              </NavLink>
            </>
          )}
        </div>
        <div className="text-blue-950 text-4xl font-normal font-['Yuji Syuku']">
          Kuwait street food
        </div>
        <div className="flex items-center gap-4">
          {user && !isLoading && profileData && (
            <>
              <img
                src={
                  `http://localhost:8000/${profileData.image}` ||
                  "path/to/default/profile.jpg"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-blue-950 text-base font-bold">
                {profileData.username}
              </span>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
