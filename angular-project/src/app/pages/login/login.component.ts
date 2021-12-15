import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });

  isDisabled = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  /* 
  * Checks if a given control has errors.
  */
  hasErrors(nameControl: string) {
    let currentControl = this.loginForm.get(nameControl);
    if (currentControl?.hasError("minlength")) {
      return "Must be 6 characters long or more";
    } else if (currentControl?.hasError("email")) {
      return "The email address is badly formatted.";
    } else if (currentControl?.hasError("required")) {
      return "You must enter a value";
    }
    this.checkButton();
    return "";
  }

  /* 
  * Checks if the form is valid.
  */
  checkButton() {
    if (this.loginForm.valid) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  /* 
  * Checks if the form is valid when enter key is pressed.
  */
  checkEnterKey() {
    if (!this.isDisabled) {
      this.onSubmit();
    }
  }

  /* 
  * Submits the data for sign in.
  */
  onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
