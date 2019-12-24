import React from "react";
import styled from "@emotion/styled/macro";
import { SerializedStyles } from "@emotion/css";
import images from "../../../images.json";
import { useTheme } from "../../../theme/ThemeProvider";
import KeywordButton from "./KeywordButton";
import Img from "react-image";
import ImagePlaceholder from "./ImagePlaceholder";

const meta = (images.meta as unknown) as Record<string, string[]>;

const Keywords = styled.div`
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  display: flex;
  flex-direction: column;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  transition: all 150ms ease-in;
  width: 100%;
`;

const KeywordHeader = styled.h4<{ color: string; font: SerializedStyles }>`
  ${({ font }) => font};
  color: ${({ color }) => color};
  margin: 1.6em 1.6em 0.5em 1.6em;
  text-transform: uppercase;
`;

const KeywordList = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin: 0 1.6em 1.2em 1.6em;
`;

const Container = styled.div`
  position: relative;
  transform-origin: center;
  transition: all 150ms ease-in;

  &:hover {
    box-shadow: 0px 0px 15px 15px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);
    z-index: 2;
  }

  &:hover ${Keywords} {
    opacity: 1;
  }
`;

const Image = styled(Img)<{ background: string }>`
  background-color: ${({ background }) => background};
  border-radius: 0.5em;
  box-shadow: 0 0 0 #000000;
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

interface Props {
  item: string;
  onClick: (item: string) => void;
  onMetaClick: (item: string) => void;
}

const GalleryItem = (props: Props) => {
  const { item, onClick, onMetaClick } = props;
  const itemMeta = meta[item];
  const {
    fonts: { caption },
    colors: {
      elements: { headline },
      illustration: { secondary }
    }
  } = useTheme();

  return (
    <Container onClick={() => onClick(item)}>
      <Image
        alt={`Gallery item with the name ${item}`}
        background={secondary}
        key={`gallery-item-${item}`}
        src={`${process.env.PUBLIC_URL}/gallery/${item}`}
        loader={<ImagePlaceholder />}
      />
      <Keywords>
        <KeywordHeader color={headline} font={caption}>
          Keywords
        </KeywordHeader>
        <KeywordList>
          {itemMeta.map(meta => (
            <KeywordButton
              key={`gallery-${item}-keyword-button-${meta}`}
              item={meta}
              onClick={item => onMetaClick(item)}
            />
          ))}
        </KeywordList>
      </Keywords>
    </Container>
  );
};

export default GalleryItem;
