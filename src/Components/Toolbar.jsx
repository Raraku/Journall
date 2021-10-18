import React from "react";
import styled from "styled-components";
import { FaRegSave } from "react-icons/fa";

export const ToolBarWrapper = styled.div`
  border: 1px solid grey;
  width: 100%;
  font-size: inherit;
  padding: 0.3em 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
`;

export default function ToolBar() {
  return (
    <ToolBarWrapper>
      <FaRegSave />
      <FaRegSave />
      <FaRegSave />
      <FaRegSave />
    </ToolBarWrapper>
  );
}
