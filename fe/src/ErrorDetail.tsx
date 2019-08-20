import * as React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { ErrorOutlined } from "@material-ui/icons";

const ErrorDetailContainer: React.FunctionComponent<{}> = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 40px);
  padding: 20px;
  max-width: 728px;
`;

const ErrorDetailText: React.FunctionComponent<{}> = styled.div`
  display: flex;
  margin: 20px 0 0 0;
`;

interface ErrorDetailProps {
  message: string;
}

function ErrorDetail({ message }: ErrorDetailProps) {
  return (
    <ErrorDetailContainer>
      <ErrorOutlined />
      <ErrorDetailText>{message}</ErrorDetailText>
    </ErrorDetailContainer>
  );
}

export default ErrorDetail;
