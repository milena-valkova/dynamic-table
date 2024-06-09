
import { setNewUuid } from '../utils/common';

const useReport = () => {

  const insertReport = (fieldsData, tree) => {

    fieldsData.forEach((field) => {
      const keyName = field.name.toLowerCase().replace(" ","_");
      tree[keyName] = {id: setNewUuid(), name: keyName};

      if(field.items.length){
        Object.keys(tree[keyName]).forEach(() => {
          return insertReport(field.items, tree[keyName]);
        });

        return { ...tree }
      }
    });
    
    return { ...tree }
  }

  const updateReport = (fieldsData, tree, currentId, newValue) => {
    fieldsData.forEach((field) => {
      const keyName = field.name.toLowerCase().replace(" ","_");

      if(tree[keyName]?.id === currentId){
        tree[keyName] = {...tree[keyName], name: newValue};
      }
  
      if(field.items.length){
        Object.keys(tree).forEach(() => {
          return updateReport(field.items, tree, currentId, newValue);
        });

        return { ...tree }
      }
    });

    return { ...tree }
  }

  const deleteReport = (items, current_id) => {
    const element = items.find(field => field.id === current_id);
    const index = items.indexOf(element);
    const newArr = Array.from(items);
    newArr.splice(index, 1);
    return newArr;
  }

  return { insertReport, updateReport, deleteReport }
}

export default useReport;