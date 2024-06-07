import React, { useState } from 'react';
import useStorage from '../hooks/useStorage';
import useItems from '../hooks/useItems';
import TableHead from './TableHead';
import Report from './Report';
import Field from './Field';

export default function TableWhole () {
  const { returnStorage, updateStorage } = useStorage();
  const { deleteItem } = useItems();

  const [fields, setFields] = useState(returnStorage("fields") || []);
  // const [fields, setFields] = useState([]);
  const [reports, setReports] = useState(returnStorage("reports") || []);
  const [editableReportId, setEditableReportId] = useState(null);

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
        <button>Add Field</button>
        <button className="ml" onClick={addReport}>Add Report</button>
      </div>
    </div>
  );
};

