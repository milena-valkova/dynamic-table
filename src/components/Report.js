export default function Report ({field, reportsData, report, parent = report, reportIndex, editReportMode, setEditReportMode}) {
  const reportKey = field.name.toLowerCase().replace(" ","_");

  const handleReportChange = ( e ) => {
    const newReports = [...reportsData];
    // debugger;
    newReports[reportIndex][reportKey] = e.target.value;
  }

  console.log(report);
  return (
    <div className="flex-column">
      <div className="text-center mb">
        {editReportMode?.id === parent.id ? 
          <input
            id={reportKey}
            name={reportKey}
            type="text"
            defaultValue={report[reportKey]?.name || ''}
            onChange={handleReportChange}
          />
          : report[reportKey]?.name  
        }
      </div>
      {report[reportKey]?.items.map((sub_report) => (
        <Report key={sub_report.id} 
          field={field} 
          reportsData={reportsData}
          report={sub_report}
          parent={field}
          reportIndex={reportIndex}
          editReportMode={editReportMode}
          setEditReportMode={setEditReportMode}
        />
      ))}
    </div>
  )
}
