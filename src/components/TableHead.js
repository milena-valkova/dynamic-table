import Action from "./Action";

const TableHead = ({fields, reports, handleDeleteReport, onSaveReport, editReportMode}) => {
  return (
    <thead>
      <tr>
        <th>{fields.length ? 'Field Name' : 'No fields and reports yet'}</th>
        {reports.map((current, index) => {
          const isEditMode = editReportMode?.id === current.id;

          return <th key={current.id}>
            <span>Report #{index + 1}</span>
            <Action
              handleClick={isEditMode ? () => onSaveReport(editReportMode) : () => handleDeleteReport(current.id)}
              className="ml"
              name={isEditMode ? "Save" : "Delete"}
            />
          </th>
        })}
      </tr>
    </thead>
  )
};

export default TableHead;