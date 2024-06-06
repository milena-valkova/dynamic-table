const useField = () => {
  const emptyField = { id: null, name: "", nestmentLevel: 0, color: '#ffffff', verticalLevel: 0, items: [] };
  const emptySubField = { id: null, name: "", nestmentLevel: 0, verticalLevel: 0, items: [] };
  const emptyReport = {};


  const returnParent = (data, id) => {
    for(var x = 0; x < data.length; x++){
      if(data[x].id === id){
        return data[x];
      }
      else{
        if(data[x].items.length){
          const item = returnParent(data[x].items, id);
          return item;
        }
      }
    }
  }

  const addSubItem = function (fields, current, item) {

    const parentCopy = returnParent(fields, current.parentId);

    if(parentCopy){
      parentCopy.items.push({
        id: crypto.randomUUID(),
        ...item,
        items: [],
      });

      return parentCopy;
    }

    // let latestItems = [];
    // latestItems = fields.items?.map(obj => {
    //   debugger;
    //   return addSubItem(obj, current.parentId, item);
    // });

    // return {...fields, items: latestItems}
  };

  const editSubItem = function (fields, current, item) {

    
  };

  const deleteSubItem = function (parent, fieldId) {};

  return { emptyField, emptySubField, emptyReport, addSubItem, editSubItem, deleteSubItem }
}

export default useField;

