import React from "react";
import styled from "@emotion/styled";

const Keyword = styled.button`
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
  display: block;
  flex-grow: 0;
  padding: 0.4em 0.8em;
  margin-right: 0.4em;
  margin-bottom: 0.4em;

  &:hover,
  &:active {
    border: none;
    outline: none;
  }
`;

interface Props {
  item: string;
  onClick: (item: string) => void;
}

const KeywordButton = (props: Props) => {
  const { item, onClick } = props;
  return (
    <Keyword
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick(item);
      }}
    >
      {item}
    </Keyword>
  );
};

export default KeywordButton;
