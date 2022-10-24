import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { authenticationService } from "../../jwt/_services/authentification.service";

function Login({ match, history }) {
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const { token } = match.params;
    if (token) {
      if (isJwt(token)) {
        const currentUser = { dejaConnecte: true, token };
        window.localStorage.removeItem("currentUser");
        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
        const { from } = {
          from: {
            pathname: "/accueil"
          }
        };
        history.push(from);
      }
    }
  }, []);

  const isJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
          })
          .join("")
      );

      return true;
    } catch (error) {
      return false;
    }
  };

  const login = (e) => {
    e.preventDefault();
    const account = e.target?.account.value;
    const password = e.target?.password.value;
    setError(false);
    setIsSubmitting(true);
    authenticationService.login(account, password).then(
      () => {
        setIsSubmitting(false);
        setError(false);
        const { from } = location.state || {
          from: {
            pathname: "/profile"
          }
        };
        history.push(from);
      },
      () => {
        setError(true);
        setIsSubmitting(false);
      }
    );
  };

  return (
    <div
      className="background-app d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="auth-card d-flex flex-column align-items-center">
        <i className="mdi mdi-chart-arc auth-icon" />
        <form onSubmit={(e) => login(e)} className="w-100">
          <FormGroup className="w-100">
            <Label className="auth-label">Login</Label>
            <Input type="text" className="auth-input" placeholder="Enter your account name" name="account" />
          </FormGroup>
          <FormGroup className="w-100">
            <Label className="auth-label">Password</Label>
            <Input type="password" className="auth-input" placeholder="Enter your password" name="password" />
          </FormGroup>
          {error && <span className="error-login">Mot de passe ou pseudo incorrecte</span>}
          <Button
            type="submit"
            className="btn w-100 auth-btn"
            style={{ boxShadow: "3px 3px 20px #1d181f" }}
            disabled={isSubmitting}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
