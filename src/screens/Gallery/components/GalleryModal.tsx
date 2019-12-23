import React, { FC, ComponentType } from "react";
import styled from "@emotion/styled";

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
  z-index: 4;
`;

interface Props {
  onClose: () => void;
}

const GalleryModal: FC<Props> = props => {
  const { onClose, children } = props;
  return (
    <Container>
      <Overlay onClick={onClose} />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default GalleryModal;
