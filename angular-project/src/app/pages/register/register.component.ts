import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    genre: new FormControl("", Validators.required),
    birthdate: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });

  isDisabled = true;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void { }

  /* 
  * Checks if a given control has errors.
  */
  hasErrors(nameControl: string) {
    let currentControl = this.registerForm.get(nameControl);
    if (currentControl?.hasError("minlength")) {
      return "Must be 6 characters long or more";
    } else if (currentControl?.hasError("email")) {
      return "The email address is badly formatted.";
    } else if (currentControl?.hasError("required")) {
      return "You must enter a value.";
    }
    this.checkButton();
    return "";
  }

  /* 
  * Checks if the form is valid.
  */
  checkButton() {
    if (this.registerForm.valid) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  /* 
  * Submits the data for sign up.
  */
  onSubmit() {
    this.authService.register(this.registerForm.value);
  }

}
