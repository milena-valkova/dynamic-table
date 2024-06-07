import { useMemo } from "react";

export default function Report ({field, reports, report, setReports, editableReport, reportIndex}) {

  const handleReportChange = (reportIndex, fieldName, value) => {
    const newReports = [...reports];
    newReports[reportIndex][fieldName] = value;
    setReports(newReports);
  };
  
  const reportKey = useMemo(() => {
    field.name.toLowerCase().replace(" ","_");
  },[field]);

  return (
    <td style={{textAlign: 'center'}} >
      {editableReport === report.id ? 
        <input
          id={reportKey}
          name={reportKey}
          type="text"
          defaultValue={report[reportKey] || ''}
          onChange={(e) => handleReportChange(reportIndex, field.name, e.target.value)}
        />
        : report[reportKey]   
      }
    </td>
  )
}
