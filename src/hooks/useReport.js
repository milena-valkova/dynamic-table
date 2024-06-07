const useItems = () => {
  
  const reduceItems = (items, current_id, updatedData) => {
    return items.reduce((array, field_item) => {
      if (field_item.id === current_id) {
        const modified_item = { ...field_item, ...updatedData };
        array.push(modified_item);
      } else {
        array.push(field_item);
      }
      return array;
    }, []);
  }

  const updateItems = (data, current_id, updatedData) => {
    for(var x = 0; x < data.length; x++){
      if(data[x].id === current_id){
        const newArr = reduceItems(data[x].items, current_id, updatedData);
        data[x].items = [...newArr];
        debugger;
        return data;
      }
      else{
        if(data[x].items.length){
          debugger;
          const dataNew = updateItems(data[x].items, current_id, updatedData);
          data[x].items = [...dataNew];
          return data
        }
      }
    }
  };

  const deleteReport = (items, current_id) => {
    const element = items.find(field => field.id === current_id);
    const index = items.indexOf(element);
    const newArr = Array.from(items);
    newArr.splice(index, 1);
    return newArr;
  }

  return { updateItems, deleteReport }
}

export default useItems;