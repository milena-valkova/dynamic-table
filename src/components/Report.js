import useReport from '../hooks/useReport';

export default function Report ({field, reportsData, setReportsData, report, reportKey, parentReport, reportIndex, editReportMode, setEditReportMode, fieldsData}){
  const { updateReport } = useReport();

  const handleReportUpdate = ( e ) => {
    const updatedItem = updateReport(fieldsData, report, report[reportKey].id, e.target.value);

    const temp = Object.keys(reportsData[0]).map(key => {
      const reporTemp = reportsData[0][key];
      if(reporTemp?.id === updatedItem.id){
        return updatedItem
      }
      return reporTemp;
    })

    setReportsData((prevData) => 
      prevData.map((item) => 
        item.id === temp.id ? temp : item 
      )
    );
  }

  return (
  report[reportKey] && 
    <div className="flex-column">
      <div className="text-center mb">
        {editReportMode?.id === parentReport.id ?
          <input
            id={reportKey}
            name={reportKey}
            type="text"
            defaultValue={report[reportKey]?.name || ''}
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
            reportsData={reportsData}
            setReportsData={setReportsData}
            report={report[reportKey]}
            parentReport={report}
            reportIndex={reportIndex}
            reportKey={key}
            editReportMode={editReportMode}
            setEditReportMode={setEditReportMode}
            fieldsData={fieldsData}
        />);
      })}
    </div>
  )
}
