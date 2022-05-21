import Header from "./components/Header";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Welcome from "./components/Welcome";
import NewBlog from "./components/NewBlog";
import BlogView from "./components/BlogView";
import PasswordResetFormEmail from "./components/PasswordResetFormEmail";
import PasswordResetFormPassword from "./components/PasswordResetFormPassword";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/password/reset/:token"
          component={PasswordResetFormPassword}
        />
        <Route
          path="/account/password/forgot"
          component={PasswordResetFormEmail}
        />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/newblog" component={NewBlog} />
        <Route path="/blogView/:id" component={BlogView} />
      </Switch>
      {pathname === "/" && <Welcome />}
    </>
  );
}

export default App;
