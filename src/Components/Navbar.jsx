import React from "react";
import styled from "styled-components";

export const NavWrapper = styled.div`
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
  }
  .top {
    justify-content: space-between;
    background-color: #8b2269;
    padding: 0 8em;
  }
  .bt > span {
    padding-right: 1em;
    color: #8b2269;
    text-transform: uppercase;
    font-weight: bold;
  }
  .bt {
    background-color: white;
    padding: 0.8em 8em;
  }
  .dlyR {
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    padding: 1rem 0;
  }
  .dlyIC {
    font-size: 2.3rem;
    ${"" /* text-transform: uppercase; */}
    font-weight: bold;
    color: white;
    padding: 1rem 0;
  }
`;

export default function Navbar() {
  return (
    <NavWrapper>
      <div className="top">
        <div className="dlyIC">Lynn Care</div>
        <div className="dlyR"> Daily Record</div>
      </div>
      <div className="bt">
        <span>DAILY RECORD</span>
        <span>CALENDAR</span>
        <span>HANDBOOK</span>
      </div>
    </NavWrapper>
  );
}
