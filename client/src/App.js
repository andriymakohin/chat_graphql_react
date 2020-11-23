import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { navigation } from "./nav/navigation";
import Home from "./pages/Home/Home";

function App() {
  const RouteLogin = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
          <Component {...props} />
      }
    />
  );
  return (
    <div>
      <Switch>
        <RouteLogin path={navigation.chat} component={Home} />
        <Redirect to={navigation.chat} />
      </Switch>
    </div>
  );
}

export default App;
