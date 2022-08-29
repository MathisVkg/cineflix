import React from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

function Login() {
  return (
    <div
      className="background-app d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="auth-card d-flex flex-column align-items-center">
        <i className="mdi mdi-chart-arc auth-icon" />
        <FormGroup className="w-100">
          <Label className="auth-label">Login</Label>
          <Input type="text" className="auth-input" placeholder="Enter your account name" />
        </FormGroup>
        <FormGroup className="w-100">
          <Label className="auth-label">Password</Label>
          <Input type="text" className="auth-input" placeholder="Enter your password" />
        </FormGroup>
        <Button className="btn w-100 auth-btn" style={{ boxShadow: "3px 3px 20px #1d181f" }}>
          Log in
        </Button>
      </div>
    </div>
  );
}

export default Login;
