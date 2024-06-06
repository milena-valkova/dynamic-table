import React, { useState } from 'react';
import useStorage from '../hooks/useStorage';
import useItems from '../hooks/useItems';
import TableHead from './TableHead';
import ManageField from './ManageField';
import Report from './Report';
import Field from './Field';
import useField from '../hooks/useField';

export default function TableWhole () {
  const { returnStorage, updateStorage } = useStorage();
  const { deleteItem } = useItems();
  const { emptyField } = useField();

  const [fields, setFields] = useState(returnStorage("fields") || []);
  // const [fields, setFields] = useState([]);
  const [reports, setReports] = useState(returnStorage("reports") || []);
  const [openInputBox, setOpenInputBox] = useState(false);
  const [editableReportId, setEditableReportId] = useState(null);
  const [current, setCurrent] = useState({...emptyField, isSubitem: false});

  const showInputBox = () => {
    setOpenInputBox(!openInputBox);
  };

  // const handleSubFieldChange = (parentIndex, subIndex, key, value) => {
  //   const copiedFields = [...fields];
  //   copiedFields[parentIndex].subfields[subIndex][key] = value;
  //   setFields(copiedFields); 
  // };

  const addReport = () => {
    const id = crypto.randomUUID();
    const newReport = {id};
    
    fields.forEach(field => {
      let keyName = field.name.toLowerCase().replace(" ","_");
      newReport[keyName] = '';
      // field.subfields && field.subfields.forEach(subfield => {
      //   newReport[subfield.name] = '';
      // });
    });

    const reportsArray = [...reports, newReport]
    setReports(reportsArray);
    updateStorage("reports", reportsArray)
  };

  const deleteReport = (id) => {
    const newReports = deleteItem(reports, id);
    updateStorage("reports", newReports);
    setReports(newReports);
  };

  return (
    <div className='container'>
      <table className='mb'>
        <TableHead 
          fields={fields} 
          reports={reports} 
          setReports={setReports}
          deleteReport={deleteReport} 
          editableReportId={editableReportId} 
          setEditableReportId={setEditableReportId}
        />
        <tbody>
          {fields && fields.map((field, fieldIndex) => (
            <tr key={fieldIndex} style={{backgroundColor: field.color}}>
              <Field 
                fields={fields}
                setFields={setFields}
                field={field}
                showInputBox={showInputBox}
                setCurrent={setCurrent}
                isSubitem={false}
              />
              { reports.map((report, reportIndex) => (
                <Report key={report.id} 
                  field={field} 
                  reports={reports}
                  report={report} 
                  setReports={setReports} 
                  editableReportId={editableReportId}
                  reportIndex={reportIndex}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pos-left mb">
        <button onClick={showInputBox}>{openInputBox ? 'Discard':'Add Field'}</button>
        <button className="ml" onClick={addReport}>Add Report</button>
      </div>
      { openInputBox && 
        <ManageField 
          onCloseBox={showInputBox} 
          fields={fields} 
          setFields={setFields} 
          current={current}
          setCurrent={setCurrent}
        />
      }
    </div>
  );
};

