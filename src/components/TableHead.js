import Action from "./Action";

export default function TableHead ({fields, reports, handleDeleteReport, onSaveReport, editReportMode}) {

  return (
    <thead>
      <tr>
        <th>{fields.length ? 'Field Name' : 'No fields and reports yet'}</th>
        {reports.map((current, index) => (
          <th key={index}>
            <span>Report #{index + 1}</span>
            { editReportMode?.id === current.id ? 
              <Action handleClick={() => onSaveReport(editReportMode)} className="ml" name="Save"/>
              :
              <Action handleClick={() => handleDeleteReport(current.id)} className='ml' name="Delete" />
            }
          </th>
        ))}
      </tr>
    </thead>
  )
}
