import * as React from "react";
import { useCallback } from "react";
import styled, { keyframes } from "styled-components";
import {
  Paper,
  Divider as RawDivider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { fadeIn } from "react-animations";
import ContinentMap from "./ContinentMap";

const ContinentSelectorContainer: React.FunctionComponent<{}> = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 40px);
  padding: 20px;
  max-width: 728px;

  animation: 0.6s ${keyframes`${fadeIn}`};
`;

const Divider: React.FunctionComponent<{}> = styled(RawDivider)`
  width: 100%;
`;

const ContinentList: React.FunctionComponent<{}> = styled(List)`
  width: 100%;
  padding: 0 0 !important;
`;

type ContinentCode = "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";

interface ContinentSelectorProps {
  continents: Array<{ code: ContinentCode; name: string }>;
  onContinentSelected: (continentCode: ContinentCode) => void;
}

function ContinentSelector({
  continents,
  onContinentSelected
}: ContinentSelectorProps) {
  const onListItemClick = useCallback((continentCode: ContinentCode) => {
    return () => onContinentSelected(continentCode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContinentSelectorContainer>
      <ContinentMap onContinentSelected={onContinentSelected} />
      <Divider />
      <ContinentList>
        {continents.map(c => (
          <ListItem key={c.code} button onClick={onListItemClick(c.code)}>
            <ListItemText>{c.name}</ListItemText>
          </ListItem>
        ))}
      </ContinentList>
    </ContinentSelectorContainer>
  );
}

export default ContinentSelector;
