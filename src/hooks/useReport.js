
import { setNewUuid } from '../utils/common';

const useReport = () => {

  const insertReport = (fieldsData, tree) => {

    fieldsData.forEach((field) => {
      const keyName = field.name.toLowerCase().replace(" ","_");
      tree[keyName] = {id: setNewUuid(), name: keyName, fieldId: field.id};

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

  const deleteCorrespondingReport = (report, fieldId) => {

    Object.keys(report).forEach(key=>{
      if (report[key].fieldId === fieldId) {
        delete report[key];
      } else if (typeof report[key] === 'object' && report[key].id) {
        deleteCorrespondingReport(report[key], fieldId);
      }
    });

    return report;
  }

  const updateAllReports = (reportsData, newField) => {
    reportsData.forEach(report => {
      const keyName = newField.name.toLowerCase().replace(" ","_");
      const newItem = {
        fieldId: newField.id,
        id: setNewUuid(),
        name: newField.name
      };
      report[keyName] = newItem;
    }
  )}

  const updateCorrespondingReport = (reportsData, newField) => {
    reportsData.forEach(report => {
      const keyName = newField.name.toLowerCase().replace(" ","_");
      const newItem = {
        fieldId: newField.id,
        id: setNewUuid(),
        name: newField.name
      };
      report[keyName] = newItem;
    }
  )}
        // if (report.id === fieldId) {
        //   // Add the new item to the report
        //   const newItem = {
        //     fieldId: newField.id,
        //     id: setNewUuid(),
        //     name: newField.name
        //   };
  
        //   report[keyName] = newItem;
  
          // If the report has nested items, update them recursively
          // if (newField.items) {
          //   updateCorrespondingReport(reportsData, newField.id);
          // }
        // } 
        // else if (report[keyName]) {
        //   // If the report already has an item with the same name, update its fieldId
        //   report[keyName].fieldId = newField.id;
  
        //   // If the report has nested items, update them recursively
        //   if (newField.items) {
        //     updateCorrespondingReport(reportsData, newField.id);
        //   }
        // }
      // });
  // }

  const deleteReport = (items, current_id) => {
    const element = items.find(field => field.id === current_id);
    const index = items.indexOf(element);
    const newArr = Array.from(items);
    newArr.splice(index, 1);
    return newArr;
  }

  return { insertReport, updateReport, deleteReport, deleteCorrespondingReport, updateAllReports, updateCorrespondingReport }
}

export default useReport;