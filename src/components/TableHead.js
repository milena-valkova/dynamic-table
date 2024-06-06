export default function TableHead ({fields, reports, setReports, deleteReport, editableReportId, setEditableReportId}) {
  

  const editReport = (id) => {
    setEditableReportId(id);
  };

  const updateReport = (report) => {
    setEditableReportId(null);
  };

  return (
    <thead>
      <tr>
        <th>{fields ? 'Field Name' : 'No fields yet'}</th>
        {reports?.map((current, index) => (
          <th key={index}>
            <span>Report #{index + 1}</span>
            <button 
              onClick={() => editableReportId ? updateReport(current) : editReport(current.id)} 
              className='ml'
            >
              {editableReportId ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteReport(current.id)} className='ml'>Delete</button>
          </th>
        ))}
      </tr>
    </thead>
  )
}
