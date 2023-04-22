import { Component } from "react";
import { Grid, Button, TextField } from "@mui/material";
import "./resetPassword.css";
import axios from "axios";
import alertify from "alertifyjs";

let currentUrl = window.location.pathname.split("/");
console.log(currentUrl);
export default class ResetPassword extends Component {
  state = {
    password: "",
    rePassword: "",
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    if (this.state.password !== this.state.rePassword) {
      alertify.error("Sifreler Eslesmiyor");
    }
    axios({
      method: "POST",
      url: `http://localhost:3001/auth/reset-password/${currentUrl[2]}/${currentUrl[3]}`,
      data: {
        password: this.state.password,
      },
    })
      .then(() => {
        alertify.success("Sifreniz Basarili Bir Sekilde Degistirildi.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        err.response.data.message.map((error) => {
          alertify.error(error);
        });
      });
  };
  render() {
    return (
      <div>
        <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid xs={12} sm={12} md={6} className="border">
            <div class="backgroundPass"></div>
          </Grid>

          <Grid xs={12} sm={12} md={6} className="m-auto text-center">
            <h2 className="text-danger">Reset Password</h2>
            <TextField
              name="password"
              type="password"
              label="New Password"
              margin="normal"
              size="small"
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name="rePassword"
              type="password"
              label="Re Password"
              margin="normal"
              size="small"
              onChange={this.handleChange}
            />
            <br />
            <Button
              variant="contained"
              color="info"
              onClick={this.handleSubmit}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
