
import { setNewUuid, returnFieldKey } from '../utils/common';

const useReport = () => {

  const insertReport = (fieldsData, tree) => {

    fieldsData.forEach((field) => {
      const keyName = returnFieldKey(field.name);
      tree[keyName] = {id: setNewUuid(), name: 0, fieldId: field.id};

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
      const keyName = returnFieldKey(field.name);

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
      const keyName = returnFieldKey(newField.name);
      const newItem = {
        fieldId: newField.id,
        id: setNewUuid(),
        name: 0
      };
      report[keyName] = newItem;
    }
  )}

  const updateCorrespondingSubReports = (report, fieldId, newField) => {
    const keyName = returnFieldKey(newField.name);
    
    Object.keys(report).forEach(key=> {
      if (report[key].fieldId === fieldId) {
        const newItem = {
          fieldId: newField.id,
          id: setNewUuid(),
          name: 0
        };

        report[key][keyName] = newItem;

      } else if (typeof report[key] === 'object' && report[key].id) {
        updateCorrespondingSubReports(report[key], fieldId, newField);
      }
    });

    return report;
  }

  const updateReportTree = (report, fieldId, newField, oldKey) => {
    const keyName = returnFieldKey(newField.name);
    
    Object.keys(report).forEach(key=> {
      if (report[key].fieldId === fieldId && oldKey !== keyName) {
        report[keyName] = {...report[oldKey]};
        delete report[oldKey];

      } else if (typeof report[key] === 'object' && report[key].id) {
        updateReportTree(report[key], fieldId, newField, oldKey);
      }
    });

    return report;
  }

  const deleteReport = (items, current_id) => {
    const element = items.find(field => field.id === current_id);
    const index = items.indexOf(element);
    const newArr = Array.from(items);
    newArr.splice(index, 1);
    return newArr;
  }

  return { 
    insertReport, 
    updateReport, 
    deleteReport,
    deleteCorrespondingReport, 
    updateAllReports, 
    updateCorrespondingSubReports,
    updateReportTree
  }
}

export default useReport;