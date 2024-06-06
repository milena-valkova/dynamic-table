export const setDefaultFields = (arrayOfFields) => {
  const fields = JSON.stringify(arrayOfFields);
  localStorage.setItem("fields", fields)
}

export function updateFields (newFields) {
  localStorage.setItem("fields", JSON.stringify(newFields));
}

export function returnFields () {
  const stringArray = localStorage.getItem("fields");
  return JSON.parse(stringArray);
}