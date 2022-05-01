import React from "react";
import { CSVLink } from "react-csv";

function ExportCSV({ csvHeaders, csvData, fileName }) {
  console.log(csvData);

  return (
    <CSVLink className="csv" headers={csvHeaders} data={csvData} filename={fileName}>
      <button className="btn btn-success">Export CSV</button>
    </CSVLink>
  );
}

export default ExportCSV;
