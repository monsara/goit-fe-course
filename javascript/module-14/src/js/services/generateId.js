export const generateId = () => {
  const date = new Date();
  const randomEnd = Math.random()
    .toString(36)
    .substr(2, 9);
  const id = `${date.getTime()}-${randomEnd}`;

  return id;
};


