import instance from ".";

const getAllIngredient = async () => {
  const { data } = await instance.get("/ingredient");
  return data;
};

export { getAllIngredient };
