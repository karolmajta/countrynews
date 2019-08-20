import * as React from "react";
import { Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createBrowserHistory } from "history";
import { WindowContext } from "./contexts";
import ContinentList from "./ContinentList";
import CountryList from "./CountryList";
import NewsList from "./NewsList";

function App() {
  return (
    <ApolloProvider
      client={new ApolloClient({ uri: process.env.REACT_APP_API_ROOT })}
    >
      <WindowContext.Provider value={window}>
        <CssBaseline />
        <Router history={createBrowserHistory()}>
          <Route exact path="/" component={ContinentList} />
          <Route exact path="/:continentId" component={CountryList} />
          <Route exact path="/:continentId/:countryId" component={NewsList} />
        </Router>
      </WindowContext.Provider>
    </ApolloProvider>
  );
}

export default App;
