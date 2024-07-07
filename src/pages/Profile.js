import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { me, update } from "../api/auth";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const userId = "someUserId";

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => me(userId),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update"],
    mutationFn: () => update(userInfo),
    onSuccess: () => {},
  });
  console.log(data);
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["profile"] });

  return (
    <div className="flex  justify-center flex-col-reverse">
      <div className="min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
        <div className="absolute inset-0 -z-10 overflow-hidden"></div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={`http://localhost:8000/${data?.image}`}
              alt="profile"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h1 className="card-title">UserName : {data?.username}</h1>
          </div>
        </div>
      </div>
      <div className="card-actions">
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button className="w-full btn btn-primary" onClick={mutate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
