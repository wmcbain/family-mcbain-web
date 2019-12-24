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
  border-bottom: 2px ${({ underline }) => underline} solid;
  color: ${({ color }) => color};
  outline: none;
  padding: 1em 1em 0.5em 1em;

  &:active {
    outline: none;
  }
`;

const ContextBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  width: calc(100% - 4em);
`;

interface Props {
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onShuffle: () => void;
}

const GalleryHeader = (props: Props) => {
  const {
    isSearching,
    setIsSearching,
    searchTerm,
    setSearchTerm,
    onShuffle
  } = props;
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
      <ContextBar>
        <SearchInput
          alt="Search photos with keywords"
          background={background}
          color={headline}
          font={h4}
          underline={secondary}
          value={searchTerm}
          onChange={e => {
            const {
              target: { value }
            } = e;
            if (!isSearching) setIsSearching(true);
            if (value.length === 0 && isSearching) setIsSearching(false);
            setSearchTerm(value);
          }}
          placeholder="Search by keyword here"
        />
        <button
          onClick={e => {
            e.preventDefault();
            onShuffle();
          }}
        >
          Shuffle
        </button>
      </ContextBar>
    </Header>
  );
};

export default GalleryHeader;
