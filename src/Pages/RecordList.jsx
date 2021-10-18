import React, { useState, useEffect } from "react";
import Record from "./../Components/Record";
import axios from "axios";

function RecordList() {
  const [todayRecords, setRecords] = useState([]);

  useEffect(() => {
    axios.get("recordsuri").then((res) => {
      setRecords(res);
    });
  }, []);

  return (
    <div>
      {todayRecords.map((record) => (
        <Record data={record} />
      ))}
    </div>
  );
}
