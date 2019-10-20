import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import { AuthProvider, useAuth } from "./contexts/auth";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const useProtectedRoute = ({ history }) => {
  const { state } = useAuth();

  useEffect(() => {
    if (!state.authenticated) {
      history.push("/");
    }
  }, [state, history]);
};

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header title="Home" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <p
          style={{
            fontSize: "60px"
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: "200",
              color: "rgba(0, 0, 0, 0.25)"
            }}
          >
            Hello, world!
          </span>{" "}
          💁
        </p>
      </div>
    </div>
  );
};

const Profile = ({ history }) => {
  const { state } = useAuth();

  // useProtectedRoute({ history });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header title="Perfil" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <TextField
          label="Nome"
          value={state.data.name || ""}
          style={{ margin: "10px" }}
        />
        <TextField
          label="E-mail"
          value={state.data.email || ""}
          style={{ margin: "10px" }}
        />
        <KeyboardDatePicker
          style={{ margin: "10px" }}
          label="Data de Aniversário"
          format="MM/dd/yyyy"
          value={state.data.dateOfBirth || undefined}
        />
      </div>
    </div>
  );
};

const Settings = ({ history }) => {
  useProtectedRoute({ history });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header title="Configurações" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <img
          style={{ height: "300px" }}
          src="https://starecat.com/content/wp-content/uploads/stop-mixing-memes-what-do-you-mean-wtf-is-happening-meow-girl-yelling-at-a-cat-mixed-with-old-guy-yelling.jpg"
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Router>
      </AuthProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
