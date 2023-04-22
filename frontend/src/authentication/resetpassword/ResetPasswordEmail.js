import { Grid, TextField, Button, Stack } from "@mui/material";
import alertify from "alertifyjs";
import axios from "axios";
import { Component } from "react";
import "./forgotPassword.css";
export default class ForgotPassword extends Component {
  state = {
    email: "",
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
    console.log(this.state.email);
  };

  handleSubmit = (e) => {
    axios({
      method: "POST",
      url: "http://localhost:3001/auth/forgot-password",
      data: {
        email: this.state.email,
      },
    })
    .then((res) => {
      console.log(res.data.data);
        alertify.success("Password reset link has been sent to the e-mail address");
        setTimeout(function() {
            window.location.href = res.data.data;
        }, 2000);
    })
    .catch((err) => {
        alertify.error(err.response.data.message);
    })
  };
  render() {
    return (
      <div>
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid xs={12} sm={12} md={6} className="border">
            <div class="backgroundForgotPass"></div>
          </Grid>

          <Grid xs={12} sm={12} md={6} className="m-auto text-center">
            <h2 className="text-danger">Reset Password</h2>
            <TextField
              name="email"
              label="Email"
              margin="normal"
              size="small"
              onChange={this.handleChange}
            />
            <br />
            <Button variant="contained" color="info" onClick={this.handleSubmit}>
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
