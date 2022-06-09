import React from "react";
import Swal from "sweetalert2";
import { IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";

class GeneratorApp extends React.Component {
  state = {
    passwordInput: "",
  };

  constructor() {
    super();
    this.passwordInputRef = React.createRef();
  }

  getPassword = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?><:{}[]";
    const passwordLength = 16;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      let rndNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(rndNumber, rndNumber + 1);
    }

    this.setState({ passwordInput: password });
  };

  copyPassword = () => {
    const { passwordInput } = this.state;

    this.passwordInputRef.current.select();
    this.passwordInputRef.current.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(passwordInput);

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "success",
      title: "Copied to clipboard.",
    });
  };

  render() {
    const { passwordInput } = this.state;

    return (
      <div className="inputBox">
        <h2>Random Password Generator App</h2>
        <input
          id="password"
          type="text"
          value={passwordInput}
          ref={this.passwordInputRef}
          placeholder="Create Password"
          readOnly
        />
        {passwordInput && (
          <IonIcon
            icon={copyOutline}
            className="copy"
            onClick={this.copyPassword}
          />
        )}
        <button id="btn" onClick={this.getPassword}>
          Generate Password
        </button>
      </div>
    );
  }
}

export default GeneratorApp;
