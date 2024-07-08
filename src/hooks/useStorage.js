const useStorage = () => {

  const updateStorage = (keyLabel, newFields) => {
    localStorage.setItem(keyLabel, JSON.stringify(newFields));
  }

  const returnStorage = (keyLabel) => {
    const result = JSON.parse(localStorage.getItem(keyLabel));

    const collator = new Intl.Collator('en', { sensitivity: 'base' });
    result?.sort((a, b) => collator.compare(a.verticalLevel, b.verticalLevel));

    return result?.length ? result : undefined;
  }

  return { updateStorage, returnStorage }
}

export default useStorage;