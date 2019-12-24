import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as McBainCrestIcon } from "../../../assets/icons/mcbain-crest.svg";
import { useTheme } from "../../../theme/ThemeProvider";

const Container = styled.div<{ background: string }>`
  align-items: center;
  background-color: ${({ background }) => background};
  display: flex;
  height: 100%;
  justify-content: center;
  flex: 1;
`;

const ImagePlaceholder = () => {
  const {
    colors: {
      illustration: { secondary, stroke }
    }
  } = useTheme();

  return (
    <Container background={secondary}>
      <McBainCrestIcon
        style={{
          color: stroke,
          width: "4em",
          height: "4em"
        }}
      />
    </Container>
  );
};

export default ImagePlaceholder;
