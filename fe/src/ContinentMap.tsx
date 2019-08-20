import * as React from "react";
import { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Svg from "react-inlinesvg";
import continentMap from "./assets/continent_map.svg";

const ContinentMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: auto;
  }

  g#africa,
  g#asia,
  g#australia,
  g#europe,
  g#south_america,
  g#north_america {
    cursor: pointer;
    opacity: 0.8
    
    &:hover {
      opacity: 1;
    }
  }
`;

type ContinentCode = "AF" | "AN" | "AS" | "EU" | "NA" | "OC" | "SA";

const SVG_CONTINENT_TO_CONTINENT_CODE: { [k: string]: ContinentCode } = {
  africa: "AF",
  asia: "AS",
  australia: "OC",
  europe: "EU",
  south_america: "SA",
  north_america: "NA"
};

interface ContinentMapProps {
  onContinentSelected: (continentCode: ContinentCode) => void;
}

function ContinentMap({ onContinentSelected }: ContinentMapProps) {
  const svgClickListeners = useRef<Map<Element, (e: Event) => void>>(new Map());

  const svgRef = useCallback((svgEl: HTMLElement) => {
    if (svgEl === null) {
      return;
    }
    Object.entries(SVG_CONTINENT_TO_CONTINENT_CODE).forEach(
      ([svgContinent, continentCode]) => {
        const l = (e: Event) => onContinentSelected(continentCode);
        const el = (svgEl as Element).querySelector(`g[id="${svgContinent}"]`);
        if (el !== null) {
          el.addEventListener("click", l);
          svgClickListeners.current.set(el, l);
        }
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      svgClickListeners.current.forEach((l, el) => {
        el.removeEventListener("click", l);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContinentMapContainer>
      <Svg src={continentMap} innerRef={svgRef}>
        <img src={continentMap} alt="World map" />
      </Svg>
    </ContinentMapContainer>
  );
}

export default ContinentMap;
