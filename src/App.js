import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Navigation from "./components/Navigation/Navigation";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chart" exact component={Chart} />
        <Route path="/users" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
