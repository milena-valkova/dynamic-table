const useStorage = () => {

  const updateStorage = (keyLabel, newFields) => {
    localStorage.setItem(keyLabel, JSON.stringify(newFields));
  }

  const returnStorage = (keyLabel) => {
    const stringArray = localStorage.getItem(keyLabel);
    return JSON.parse(stringArray);
  }

  return { updateStorage, returnStorage }
}

export default useStorage;