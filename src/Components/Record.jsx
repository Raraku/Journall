import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

export const IndRecordWrapper = styled.div`
  ${"" /* margin: 0em 3em; */}
  ${"" /* position:fixed; */}
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid black;
`;

export const RItemWrapper = styled.div`
  display: flex;
  background-color: #fff;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export default function Record(props) {
  const [todaysRecords, setTodaysRecords] = useState([]);
  useEffect(() => {
    console.log(props.currentRecord);
    if (Object.keys(props.currentRecord).length > 0) {
      setTodaysRecords(props.currentRecord);
    } else {
      setTodaysRecords([]);
    }
  }, [props.currentRecord]);

  return (
    <IndRecordWrapper>
      <div className="stack-1">
        <span className="record-head">
          #19630 — {props.selectedDate.format("dddd, MMMM D, YYYY")}{" "}
        </span>
        <div className="heading-nav">
          <b onClick={props.goBack}>{"<"}Back</b>
          <b onClick={props.goForward}>Forward {"<"}</b>
          <b onClick={props.today}>Today</b>
        </div>
      </div>
      <div className="stack-2">
        {todaysRecords.map((record) => (
          <RecordItem recordData={record} />
        ))}
      </div>
    </IndRecordWrapper>
  );
}

function RecordItem({ recordData }) {
  return (
    <RItemWrapper>
      <div className="record-time record-child">
        {dayjs.unix(recordData.timestamp).format("h:mm:ssa")}
      </div>
      <div className="record-type record-child">
        <span className="record-cat-inline">{recordData.category}:</span>{" "}
        {recordData.type != "image-record" ? (
          <>{recordData.content}</>
        ) : (
          <>
            <img src={recordData.content} />
          </>
        )}
      </div>
    </RItemWrapper>
  );
}

const item = {
  type: "textarea",
  id: "some-id",
  content: "some-content",
};

// {
//   type: "text-record",
//   category: "Notation",
//   timestamp: dayjs().unix(),
//   content:
//     "lorem ipsum lopor der lorem ipsum lopor der lorem ipsum lopor der lorem ipsum lopor der lorem ipsum lopor derlorem ipsum lopor der lorem ipsum lopor der lorem ipsum lopor der lorem ipsum lopor der lorem ipsum lopor der",
// },
