import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as McBainCrestIcon } from "../../../assets/icons/mcbain-crest.svg";
import { useTheme } from "../../../theme/ThemeProvider";

const Container = styled.div<{
  background: string;
  height?: number | string;
}>`
  align-items: center;
  background-color: ${({ background }) => background};
  display: flex;
  height: 100%;
  ${({ height }) => (height ? `height: ${height};` : "")};
  justify-content: center;
  flex: 1;
`;

interface Props {
  height?: number | string;
}

const ImagePlaceholder = (props: Props) => {
  const { height } = props;
  const {
    colors: {
      illustration: { secondary, stroke }
    }
  } = useTheme();

  return (
    <Container background={secondary} height={height}>
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
