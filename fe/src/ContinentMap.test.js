import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "enzyme";

import ContinentMap from "./ContinentMap";

describe("ContinentMap", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ContinentMap onContinentSelected={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("matches snapshot", () => {
    const continentMap = render(
      <ContinentMap onContinentSelected={() => {}} />
    );
    expect(continentMap).toMatchSnapshot();
  });
});
