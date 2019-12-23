import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as McBainCrestIcon } from "../../../assets/icons/mcbain-crest.svg";
import { SerializedStyles } from "@emotion/css";
import { useTheme } from "../../../theme/ThemeProvider";
import useMedia from "use-media";

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const HeaderBanner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const HeaderCopy = styled.h1`
  padding: 1em 0.4em;
`;

const SearchInput = styled.input<{
  color: string;
  background: string;
  font: SerializedStyles;
  underline: string;
}>`
  ${({ font }) => font};
  background: ${({ background }) => background};
  border: none;
  border-bottom: ${({ underline }) => underline};
  color: ${({ color }) => color};
  margin-left: -0.5em;
  margin-top: -1em;
  outline: none;
  padding: 1em 0;
  text-align: center;
  width: 100%;

  &:active {
    outline: none;
  }
`;

interface Props {
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const GalleryHeader = (props: Props) => {
  const { isSearching, setIsSearching, searchTerm, setSearchTerm } = props;
  const isMedium = useMedia({ maxWidth: "70em" }, false);
  const isSmall = useMedia({ maxWidth: "50em" }, true);
  let iconSize = isSmall ? 40 : 120;
  iconSize = isMedium ? 60 : iconSize;
  const {
    colors: {
      elements: { background, headline },
      illustration: { secondary }
    },
    fonts: { h4 }
  } = useTheme();
  return (
    <Header>
      <HeaderBanner>
        <HeaderCopy>FAMILY</HeaderCopy>
        <McBainCrestIcon fill={headline} width={iconSize} height={iconSize} />
        <HeaderCopy>McBAIN</HeaderCopy>
      </HeaderBanner>
      <SearchInput
        alt="Search photos with keywords"
        background={background}
        color={headline}
        font={h4}
        underline={secondary}
        value={searchTerm}
        onChange={e => {
          if (!isSearching) setIsSearching(true);
          setSearchTerm(e.target.value);
        }}
        placeholder="Search by keyword here"
      />
    </Header>
  );
};

export default GalleryHeader;
