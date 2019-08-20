import * as React from "react";
import { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { Paper, CircularProgress } from "@material-ui/core";
import ContinentSelector from "./ContinentSelector";
import ErrorDetail from "./ErrorDetail";
import { RouteComponentProps } from "react-router";

const ContentListContainer: React.FunctionComponent<{}> = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const SpinnerContainer: React.FunctionComponent<{}> = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`;

interface ContinentListProps extends RouteComponentProps {}

function ContinentList({ location, history }: ContinentListProps) {
  const { loading, error, data } = useQuery(gql`
    {
      continents {
        code
        name
      }
    }
  `);

  const onContinentSelected = useCallback((continentId: string) => {
    history.push(`${location.pathname}${continentId}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContentListContainer>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress />
        </SpinnerContainer>
      ) : !error ? (
        <ContinentSelector
          continents={data.continents}
          onContinentSelected={onContinentSelected}
        />
      ) : (
        <ErrorDetail message={error.message} />
      )}
    </ContentListContainer>
  );
}

export default ContinentList;
