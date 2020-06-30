const createKey = (name) => {
  return name.replace(/\s+/g, `-`).replace(/:/g, ``).toLowerCase();
};

export {createKey};
