import * as React from "react";
import { useCallback } from "react";
import {
  AppBar as AppBarRaw,
  Paper,
  CircularProgress,
  List as ListRaw,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { ChevronRight } from "@material-ui/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { gql } from "apollo-boost";
import { fadeIn } from "react-animations";
import ErrorDetail from "./ErrorDetail";

const CountryListContainer: React.FunctionComponent<{}> = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 40px);
  max-width: 728px;
  margin: 0 auto 30px auto;

  animation: 0.6s ${keyframes`${fadeIn}`};
`;

const NonListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 40px);
  min-height: calc(100vh - 95px);
  max-width: 728px;
  margin: 0 auto 30px auto;
`;

const SpinnerContainer: React.FunctionComponent<{}> = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`;

const AppBar = styled(AppBarRaw)`
  margin-bottom: 30px;
`;

const AppBarContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100vw - 40px);
  padding: 20px;
  max-width: 728px;
  margin: auto;
`;

const AppBarLink = styled(Link)`
  font-weight: bold;
  font-size: 14px;
  color: black;
  text-decoration: none;
`;

const List: React.FunctionComponent<{}> = styled(ListRaw)`
  width: 100%;
  padding: 0 0 !important;
`;

interface CountryListProps
  extends RouteComponentProps<{ continentId: string }> {}

function CountryList({ match, history }: CountryListProps) {
  const { loading, error, data } = useQuery(gql`
    {
      continent(continentCode: "${match.params.continentId}") {
        code,
        name,
        countries {
          code,
          name,
          emoji
        }
      }
    }
`);

  const onCountryClick = useCallback(
    (countryCode: string) => {
      return () => history.push(`/${data.continent.code}/${countryCode}`);
    },
    [data] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const fullError: string | null = error
    ? error.message
    : data.continent === null
    ? "Continent not found."
    : null;

  return loading ? (
    <NonListWrapper>
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
    </NonListWrapper>
  ) : !fullError ? (
    <>
      <AppBar position="static" color="default">
        <AppBarContents>
          <AppBarLink to="/" href="/" data-cy="back-to-all">
            All Continents
          </AppBarLink>
          <ChevronRight />
          <AppBarLink
            to={`/${data.continent.code}`}
            href={`/${data.continent.code}`}
          >
            {data.continent.name}
          </AppBarLink>
        </AppBarContents>
      </AppBar>
      <CountryListContainer>
        <List>
          {data.continent.countries
            .sort((c1: { name: string }, c2: { name: string }) =>
              c1.name.localeCompare(c2.name)
            )
            .map((c: { code: string; emoji: string; name: string }) => (
              <ListItem
                key={c.code}
                button
                onClick={onCountryClick(c.code)}
                data-cy={`country-item`}
              >
                <ListItemText>
                  {c.emoji} {c.name}
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </CountryListContainer>
    </>
  ) : (
    <NonListWrapper>
      <ErrorDetail message={fullError} />
    </NonListWrapper>
  );
}

export default CountryList;
