const useStorage = () => {

  const updateStorage = (keyLabel, newFields) => {
    localStorage.setItem(keyLabel, JSON.stringify(newFields));
  }

  const returnStorage = (keyLabel) => {
    const stringArray = localStorage.getItem(keyLabel);
    return stringArray.length ? JSON.parse(stringArray) : undefined;
  }

  return { updateStorage, returnStorage }
}

export default useStorage;