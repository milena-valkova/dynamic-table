export const setNewUuid = () => {
  return crypto.randomUUID();
}

export const returnFieldKey = (name) => {
  return name.toLowerCase().replace(/\s+/g,"_");
} 

export const returnNewItem = (event, field) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name');
  const verticalLevel = Number(data.get('verticalLevel'));
  const color = field?.color || data.get('color');
  const nestmentLevel = Number(data.get('nestmentLevel'));
  const id = setNewUuid();
  return {id, name, verticalLevel, color, nestmentLevel, items:[]};
}

export const returnUpdatedItem = (event, isSubitem, field) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name');
  const color = field?.color || data.get('color');
  const verticalLevel = Number(data.get('verticalLevel'));
  const nestmentLevel = Number(data.get('nestmentLevel'));
  return {name, verticalLevel, color: isSubitem ? "" : color, nestmentLevel};
}