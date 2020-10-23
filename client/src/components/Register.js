import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { validateFields } from "../utils/common";
import { Link } from "react-router-dom";
import API from "../utils/API";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    cpassword: "",
    name: "",
    balance: "",
    withdraw: "",
    deposit: "",
    lastTrans: "",
    successMsg: "",
    errorMsg: {
      signin_error: "",
    },
    isSubmitted: false,
  };

  componentDidMount() {
    this.loadAccounts();
  }

  loadAccounts = () => {
    API.getAccounts()
      .then((res) => this.setState({ accounts: res.data }))
      .catch((err) => console.log(err));
  };

  deleteAccount = (id) => {
    API.deleteAccount(id)
      .then((res) => this.loadAccounts())
      .catch((err) => console.log(err));
  };

  registerUser = (event) => {
    event.preventDefault();
    const {
      email,
      password,
      cpassword,
      name,
      balance,
      successMsg,
      errorMsg,
      isSubmitted,
    } = this.state;
    const fieldsToValidate = [
      { email },
      { password },
      { cpassword },
      { name },
      { balance },
      { successMsg },
      { errorMsg },
      { isSubmitted },
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: "Please enter all the fields.",
        },
      });
      console.log(this.state);
    } else {
      // console.log("password: " + password);
      // console.log("cpassword: " + cpassword);
      if (password !== cpassword) {
        this.setState({
          errorMsg: {
            signin_error: "Password and confirm password do not match",
          },
        });
      } else {
        this.setState({
          errorMsg: {
            signin_error: "",
          },
        });
        // register successful
        if (this.state.name && this.state.email) {
          API.saveAccount({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cpassword: this.state.cpassword,
            name: this.state.name,
            balance: this.state.balance,
            withdraw: this.state.withdraw,
            deposit: this.state.deposit,
            lastTrans: this.state.lastTrans,
            successMsg: this.state.successMsg,
            isSubmitted: true
          })
            .then((res) => this.loadAccounts())
            .catch((err) => console.log(err));
        }
      }
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { successMsg, errorMsg, isSubmitted } = this.state;
    return (
      <div className="register-page">
        <h1>Reggie y'all!!</h1>
        <div className="register-form">
          <Form onSubmit={this.registerUser.bind(this)}>
            {errorMsg && errorMsg.signin_error ? (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            ) : (
              isSubmitted && (
                <p className="successMsg centered-message">{successMsg}</p>
              )
            )}
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="cpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="cpassword"
                placeholder="Confirm password"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="What's Your Name?"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="balance">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="number"
                name="balance"
                placeholder="How much you got?"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <div className="action-items">
              <Button type="submit" className="btn btn-danger">
                Register
              </Button>
              <Link to="/" className="btn btn-warning">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
