import React from "react";
import styled from "@emotion/styled";

const Keyword = styled.button`
  cursor: pointer;
  display: block;
  flex-grow: 0;
  margin-right: 0.4em;
  margin-bottom: 0.4em;
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
