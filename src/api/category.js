import instance from ".";

const getAllCategory = async () => {
  const { data } = await instance.get("/category");
  return data;
};
const createCategory = async () => {
  const { data } = await instance.post("/category");
  return data;
};

export { getAllCategory, createCategory };
