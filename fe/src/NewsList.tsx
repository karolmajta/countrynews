import * as React from "react";
import { useCallback, useContext } from "react";
import {
  AppBar as AppBarRaw,
  Paper,
  CircularProgress
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { ChevronRight } from "@material-ui/icons";
import { Link, RouteComponentProps } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { gql } from "apollo-boost";
import { fadeIn } from "react-animations";
import { WindowContext } from "./contexts";
import ErrorDetail from "./ErrorDetail";

const NewsTilesContainer = styled.div`
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

const NewsPiece: React.FunctionComponent<{
  onClick: (e: any) => void;
}> = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const NewsImage = styled.img`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

interface NewsListProps
  extends RouteComponentProps<{ continentId: string; countryId: string }> {}

function NewsList({ match, history }: NewsListProps) {
  const window = useContext(WindowContext);

  const { loading, error, data } = useQuery(gql`
    {
      continent(continentCode: "${match.params.continentId}") {
        code,
        name,
      },
      country(continentCode: "${match.params.continentId}", countryCode: "${match.params.countryId}") {
        code,
        name,
          news {
              url,
              imageUrl,
              title
          }
      }
    }
`);

  const onNewsPieceClick = useCallback((n: { url: string }) => {
    return (e: any) => ((window as Window).location.href = n.url);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fullError: string | null = error
    ? error.message
    : data.continent === null
    ? "Continent not found."
    : data.country === null
    ? "Country not found."
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
          <ChevronRight />
          <AppBarLink
            to={`/${data.continent.code}/${data.country.code}`}
            href={`/${data.continent.code}/${data.country.code}`}
            data-cy="back-to-continent"
          >
            {data.country.name}
          </AppBarLink>
        </AppBarContents>
      </AppBar>
      <NewsTilesContainer>
        {data.country.news.map(
          (n: { url: string; imageUrl: string; title: string }) => (
            <NewsPiece onClick={onNewsPieceClick(n)} data-cy="news-item">
              <NewsImage src={n.imageUrl} alt={n.title} />
              {n.title}
            </NewsPiece>
          )
        )}
      </NewsTilesContainer>
    </>
  ) : (
    <NonListWrapper>
      <ErrorDetail message={fullError} />
    </NonListWrapper>
  );
}

export default NewsList;
