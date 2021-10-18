import React, { useState, useEffect } from "react";
import ToolBar from "./../Components/Toolbar";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Record from "./../Components/Record";
import RecordSideBar from "../Components/RecordSideBar";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "./../firebase";
import dayjs from "dayjs";

export const RecordWrapper = styled.div`
  ${"" /* font-size: 22px; */}
  margin: 0em 8em;
  textarea {
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    font-size: inherit;
  }
`;

export const CurrentDateContext = React.createContext();
const db = getFirestore(app);

export default function DailyRecord() {
  const [currentRecord, setCurrentRecord] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs());
  useEffect(async () => {
    console.log("running");
    try {
      const docRef = doc(db, "entries", selectedDate.format("DD:MM:YYYY"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentRecord(docSnap.data().records);
      } else {
        setCurrentRecord([]);
        await setDoc(doc(db, "entries", selectedDate.format("DD:MM:YYYY")), {
          timestamp: dayjs().unix(),
          records: [],
        });

        console.log("nah");
      }
    } catch {}
  }, [selectedDate]);

  function goBack() {
    setSelectedDate(selectedDate.add(-1, "day"));
  }
  function forward() {
    setSelectedDate(selectedDate.add(1, "day"));
  }
  function today() {
    setSelectedDate(dayjs());
  }

  return (
    <RecordWrapper>
      <CurrentDateContext.Provider value={currentRecord}>
        <Grid className="gr" container spacing={1}>
          <Grid className="gr-1" item xs={8}>
            <Record
              selectedDate={selectedDate}
              currentRecord={currentRecord}
              goBack={goBack}
              goForward={forward}
              today={today}
            />
          </Grid>
          <Grid className="gr-2" item xs={4}>
            <RecordSideBar refresh={today} />
          </Grid>
        </Grid>
      </CurrentDateContext.Provider>
    </RecordWrapper>
  );
}

// const item = {
//   type: "textarea",
//   id: "some-id",
//   content: "some-content"
// };
