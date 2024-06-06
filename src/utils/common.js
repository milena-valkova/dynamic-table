
export const emptyField = { id: null, name: "", nestmentLevel: 0, color: '#ffffff', verticalLevel: 0, subfields: [] };

export const updateItems = (fields, current_id, updatedData) => {
  return fields.reduce((array, field_item) => {
    if (field_item.id === current_id) {
      const modified_item = { ...field_item, ...updatedData };
      array.push(modified_item);
    } else {
      array.push(field_item);
    }
    return array;
  }, []);
};

export const deleteItem = (fields, current_id) => {
  const element = fields.find(field => field.id === current_id);
  const index = fields.indexOf(element);
  const newArr = Array.from(fields);
  newArr.splice(index, 1);
  return newArr;
}