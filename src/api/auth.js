import instance from ".";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};
const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const login = async (userInfo) => {
  const { data } = await instance.post("/signin", userInfo);

  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) {
    formData.append(key, userInfo[key]);
  }

  const { data } = await instance.post("/signup", userInfo);
  storeToken(data);
  return data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const me = async (userId) => {
  try {
    const { data } = await instance.get(`/me`);

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
//this update function is to update user profile
const update = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);
  const { data } = await instance.post("/updateUser", formData);

  return data;
};

export { checkToken, storeToken, login, register, logout, me, update };
