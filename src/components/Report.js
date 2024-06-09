import useReport from '../hooks/useReport';

export default function Report ({
  field, 
  reportsData, 
  setReportsData, 
  report, 
  reportKey, 
  reportIndex, 
  editReportMode, 
  setEditReportMode, 
  fieldsData
}){
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

  const checkIfIsEditMode = (obj , id) =>{
    if (obj.id === id) {
      return true;
    }
  
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key]?.id) {
        const found = checkIfIsEditMode(obj[key], id);
        if (found) {
          return true;
        }
      }
    }
  
    return false;
  }

  return (
  report[reportKey] && 
    <div className="flex-column">
      <div className="text-center mb">
        {editReportMode && checkIfIsEditMode(editReportMode, report?.[reportKey].id) ?
          <input
            id={reportKey}
            name={reportKey}
            type="number"
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
