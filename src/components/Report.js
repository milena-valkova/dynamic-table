import useReport from '../hooks/useReport';

export default function Report ({field, handleUpdateReport, report, reportKey, parentReport, reportIndex, editReportMode, setEditReportMode, fieldsData, isSubfield}){
  const { updateReport } = useReport();

  const handleReportUpdate = ( e ) => {
    const newTree = updateReport(fieldsData, report, report[reportKey].id, e.target.value);
    handleUpdateReport(newTree);
  }

  return (
    <div className="flex-column">
      <div className="text-center mb">
        {editReportMode?.id === parentReport.id || editReportMode?.id && isSubfield ? 
          <input
            id={reportKey}
            name={reportKey}
            type="text"
            defaultValue={report[reportKey].name || ''}
            onChange={handleReportUpdate}
          />
          : report[reportKey].name  
        }
      </div>
      
      {Object.keys(report[reportKey]).map((key) => {
        const sub_report = report[reportKey][key];
        return sub_report?.id  &&
        ( <Report 
            key={sub_report.id} 
            field={field} 
            handleUpdateReport={handleUpdateReport}
            report={report[reportKey]}
            parentReport={report}
            reportIndex={reportIndex}
            reportKey={key}
            editReportMode={editReportMode}
            setEditReportMode={setEditReportMode}
            isSubfield={true}
            fieldsData={fieldsData}
        />);
      })}
    </div>
  )
}
