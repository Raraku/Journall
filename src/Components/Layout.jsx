import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fde8f1;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -10;
`;

export default function Layout(props) {
  return (
    <div>
      <LayoutWrapper>
        <Navbar />
        <div style={{ marginTop: "1em" }}>{props.children}</div>
      </LayoutWrapper>
    </div>
  );
}
