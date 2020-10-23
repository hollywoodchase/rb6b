import React from "react";
import { validateFields } from "../utils/common";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { render } from "node-sass";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMsg: "",
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      alert("Enter all fields now!");
      this.setState({
        errorMsg: {
          signin_error: "Please enter all the fields.",
        },
      });
      console.log(this.state.errorMsg);
    } else {
      alert("Good job entering all of the fields!");
      this.setState({
        errorMsg: {
          signin_error: "",
        },
      });
    }
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const errorMsg = this.state;
    return (
      <div className="login-page">
        <h1>Danny's Bank</h1>
        <div className="login-form">
          <Form onSubmit={this.handleLogin.bind(this)}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email Addy"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password Patty"
                onChange={this.handleInputChange.bind(this)}
              ></Form.Control>
            </Form.Group>
            <div className="action-items">
              <Button type="submit" className="btn btn-warning">
                Login
              </Button>
              <Link to="/register" className="btn btn-danger">Register</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);

// class LoginPractice extends React.Component {
//   state = {
//     email: "",
//     password: "",
//     errorMsg: "",
//   };

//   handleLogin = (event) => {
//     event.preventDefault();
//     const { email, password } = this.state;
//     const fieldsToValidate = [{ email }, { password }];

//     const allFieldsEntered = validateFields(fieldsToValidate);
//     if (!allFieldsEntered) {
//       alert("Enter all fields now!");
//       this.setState({
//         errorMsg: {
//           signin_error: "Please enter all the fields.",
//         },
//       });
//       console.log(this.state.errorMsg);
//     } else {
//       alert("Good job entering all of the fields!");
//       this.setState({
//         errorMsg: {
//           signin_error: "",
//         },
//       });
//     }
//   };

//   handleInputChange = async (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     this.setState({
//       [name]: value
//     });
//   };

//   render() {
//     const errorMsg = this.state;
//     return (
//       <div className="login-page">
//         <h1>Darny's Barnc</h1>
//         <div className="login-form">
//           <Form onSubmit={this.handleLogin.bind(this)}>
//             {errorMsg && errorMsg.signin_error && (
//               <p className="errorMsg centered-message">
//                 {errorMsg.signin_error}
//               </p>
//             )}
//             <Form.Group controlId="email">
//               <Form.Label>Email Addy</Form.Label>
//               <Form.Control
//                 name="email"
//                 type="email"
//                 placeholder="Email Addy"
//                 onChange={this.handleInputChange.bind(this)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="password">
//               <Form.Label>Email Addy</Form.Label>
//               <Form.Control
//                 name="password"
//                 type="password"
//                 placeholder="Password Patty"
//                 onChange={this.handleInputChange.bind(this)}
//               ></Form.Control>
//             </Form.Group>
//             <div className="action-items">
//               <Button variant="danger" type="submit">
//                 Login
//               </Button>
//               <Link to="/register" className="btn btn-warning">
//                 Register
//               </Link>
//             </div>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect()(LoginPractice);
