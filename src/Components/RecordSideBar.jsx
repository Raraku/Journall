import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import { IconContext } from "react-icons";
import dayjs from "dayjs";
import RecordSideBar from "../Components/RecordSideBar";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { app } from "./../firebase";

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CATEGORIES = [
  "NOTATION",
  "CHECKED VITALS",
  "EXERCISE",
  "FOOD SERVED",
  "HYGIENE/GROOMING",
  "HOUSEKEEPING",
  "MAINTENANCE",
  "MEDS DISPENSED",
  "OUTING/EVENT",
  "PHOTO POSTED",
  "SCHEDULE REQUEST",
  "SHOPPING LIST",
  "SUGGESTIONS",
];
const db = getFirestore(app);

export default (props) => {
  const [selected, setSelected] = useState(false);
  const [newRecordType, setNewRecordType] = useState("");

  const createNewRecord = async (newRecord) => {
    console.log(newRecord);
    await updateDoc(doc(db, "entries", dayjs().format("DD:MM:YYYY")), {
      records: arrayUnion(newRecord),
    }).then(() => {
      props.refresh();
    });
  };
  return (
    <SidebarWrapper>
      <div className="stack-3">
        <div className="fir">CTL MEMO</div>
        <div className="sec">
          REMINDER : Please make sure to lock all the doors at night and put the
          trash by the mailbox. The dogs are going to the vet tomorrow morning.
          <br />
          <br /> Thank you. - CTL
        </div>
      </div>
      <div className="stack-4">
        <div className="reflex">
          <div className="dropdown-display">
            {newRecordType == "" ? "SELECT CATEGORY" : newRecordType}
          </div>
          <div
            onClick={() => {
              setSelected(!selected);
            }}
            className="dropdown-icon"
          >
            <div className="dropdown-icon">
              <IconContext.Provider value={{ size: "1vw" }}>
                <IoMdArrowDropdown />{" "}
              </IconContext.Provider>
            </div>
          </div>
        </div>
        {!selected ? (
          <div className="cat-cont">
            {CATEGORIES.map((cat) => (
              <div
                onClick={() => {
                  setNewRecordType(cat);
                  setSelected(!selected);
                }}
                className="cat-item"
              >
                {cat}
              </div>
            ))}
            <br />
            <div className="cat-item">SIGN IN / OUT</div>
          </div>
        ) : (
          <SwitchInput type={newRecordType} createNewRecord={createNewRecord} />
        )}
      </div>
    </SidebarWrapper>
  );
};

const SwitchInput = (props) => {
  // const [recordData, setRecordData] = useState({

  // })
  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }
  switch (props.type) {
    case "CHECKED VITALS":
      const [vitalDetails, setVitalDetails] = useState({
        A: "",
        B: "",
        C: "",
      });

      function updateValues(event) {
        setVitalDetails((details) => {
          details[event.target.name] = event.target.value;
          return { ...details };
        });
      }

      function vitalSubmit(event) {
        event.preventDefault();
        var string = `Weight: ${vitalDetails.A} Temperature: ${vitalDetails.B} Blood Pressure: ${vitalDetails.C}`;
        props.createNewRecord({
          content: string,
          type: props.type,
          category: props.type,
          timestamp: dayjs().unix(),
        });
      }
      return (
        <form onSubmit={vitalSubmit} className="reduce">
          <div className="modals-vitals">
            <div>
              <label>Enter weight: </label>
              <input
                name="A"
                onChange={updateValues}
                value={vitalDetails.A}
                type="text"
              ></input>
            </div>
            <div>
              <label>Enter temperature: </label>
              <input
                name="B"
                onChange={updateValues}
                value={vitalDetails.B}
                type="text"
              ></input>
            </div>
            <div>
              <label>Enter Blood Pressure: </label>
              <input
                name="C"
                onChange={updateValues}
                value={vitalDetails.C}
                type="text"
              ></input>
            </div>
          </div>
          <div className="button-div">
            <input className="da-button button" type="submit" value="SUBMIT" />
          </div>
        </form>
      );
      break;
    case "MEDS DISPENSED":
      const [vitalMedDetails, setVitalMedDetails] = useState({
        AMMED: false,
        Other: "",
      });

      function updateMedValues(event) {
        setVitalMedDetails((details) => {
          details[event.target.name] = event.target.value;
          return { ...details };
        });
      }
      function switchAMMED(event) {
        setVitalMedDetails((medd) => {
          var details = { ...medd };
          details.AMMED = !details.AMMED;
          return details;
        });
      }
      function medSubmit(event) {
        event.preventDefault();
        var string = "";
        if (vitalMedDetails.AMMED) {
          string = `AM MED Package dispensed. ${vitalMedDetails.Other}`;
        } else {
          string = `PM MED Package dispensed. ${vitalMedDetails.Other}`;
        }
        props.createNewRecord({
          content: string,
          type: props.type,
          category: props.type,
          timestamp: dayjs().unix(),
        });
      }
      return (
        <form onSubmit={medSubmit} className="reduce">
          <div className="modals-vitals">
            <div className="rte">
              <div>
                <input
                  name="A"
                  onChange={switchAMMED}
                  value="am"
                  // value={vitalMedDetails.AMMED}
                  checked={vitalMedDetails.AMMED}
                  type="radio"
                ></input>{" "}
                <label>AM Med Package </label>
              </div>
              <div>
                <input
                  name="B"
                  onChange={switchAMMED}
                  value="pm"
                  // value={!vitalMedDetails.AMMED}
                  checked={!vitalMedDetails.AMMED}
                  type="radio"
                ></input>{" "}
                <label>PM Med Package </label>
              </div>
            </div>
            <div className="flexxy">
              <label>Other: </label>
              <textarea
                name="Other"
                className="medTextarea"
                onChange={updateMedValues}
                value={vitalMedDetails.Other}
                type="textarea"
                rows="4"
                cols="50"
              />
            </div>
          </div>
          <div className="button-div">
            <input className="da-button button" type="submit" value="SUBMIT" />
          </div>
        </form>
      );
    case "PHOTO POST":
      return <div></div>;
    case "SIGN IN/OUT":
      return <div></div>;
    default:
      const [notationDetails, setNotationDetails] = useState("");

      function updateNotationValues(event) {
        setNotationDetails(event.target.value);
      }

      function notationSubmit(event) {
        event.preventDefault();
        props.createNewRecord({
          content: notationDetails,
          type: props.type,
          category: props.type,
          timestamp: dayjs().unix(),
        });
      }
      return (
        <form onSubmit={notationSubmit} className="reduce">
          <div className="not-es">
            <div className="flexxy">
              <textarea
                name="Other"
                className="medTextarea"
                onChange={updateNotationValues}
                value={notationDetails}
                type="textarea"
                rows="10"
              />
            </div>
          </div>
          <div className="button-div">
            <input className="da-button button" type="submit" value="SUBMIT" />
          </div>
        </form>
      );
  }
};

const ipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

const item = {
  type: "textarea",
  id: "some-id",
  content: "some-content",
};
