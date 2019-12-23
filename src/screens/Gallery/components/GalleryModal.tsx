import React, { FC, ComponentType } from "react";
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/css";
import { useTheme } from "../../../theme/ThemeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
`;

const Overlay: ComponentType<{
  onClick: () => void;
}> = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 4;
`;

const ModalImage = styled.img`
  height: 80vh;
  width: auto;
  object-fit: contain;

  @media (max-width: 50em) {
    height: auto;
    width: 80vw;
  }
`;

const MetaContainer = styled.div<{ background: string }>`
  background-color: ${({ background }) => background};
  display: flex;
  flex-direction: column;
  padding: 2em 1.6em;
`;

const MetaHeader = styled.h4<{ color: string; font: SerializedStyles }>`
  ${({ font }) => font};
  color: ${({ color }) => color};
  font-size: 1.6em;
  margin-bottom: 1em;
  text-transform: uppercase;
`;

const MetaItems = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

const MetaItem = styled.p<{
  background: string;
  color: string;
  font: SerializedStyles;
}>`
  ${({ font }) => font};
  background-color: ${({ background }) => background};
  border-radius: 0.4em;
  color: ${({ color }) => color};
  font-size: 1.8em;
  padding: 0.4em 0.8em;
  margin-right: 0.6em;
  margin-bottom: 0.6em;
`;

const CloseButton = styled.button`
  align-items: centter;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 1.5em;
  cursor: pointer;
  position: absolute;
  height: 3em;
  justify-content: center;
  display: flex;
  right: 1em;
  top: 1em;
  width: 3em;
  animation: all 100ms ease;

  &:hover,
  &:active {
    border: none;
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  onClose: () => void;
  selectedItem: string | null;
  selectedMetaItems: string[] | null;
}

const GalleryModal: FC<Props> = props => {
  const { onClose, selectedItem, selectedMetaItems } = props;

  const {
    colors: {
      elements: { background, headline, button, buttonText }
    },
    fonts: { button: buttonFont, caption }
  } = useTheme();

  return (
    <Container>
      <Overlay onClick={onClose} />
      <ContentContainer>
        <CloseButton
          onClick={e => {
            e.preventDefault();
            onClose();
          }}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{
              color: headline,
              height: "1.5em",
              width: "1.5em"
            }}
          />
        </CloseButton>
        <ModalImage src={`${process.env.PUBLIC_URL}/gallery/${selectedItem}`} />
        <MetaContainer background={background}>
          <MetaHeader color={headline} font={caption}>
            Keywords
          </MetaHeader>
          <MetaItems>
            {selectedMetaItems?.map(meta => (
              <MetaItem
                key={`modal-meta-${meta}`}
                background={button}
                color={buttonText}
                font={buttonFont}
              >
                {meta}
              </MetaItem>
            ))}
          </MetaItems>
        </MetaContainer>
      </ContentContainer>
    </Container>
  );
};

export default GalleryModal;
