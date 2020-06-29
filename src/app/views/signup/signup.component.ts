import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/http/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignUpComponent implements OnInit {
  formSignUp = new FormGroup({
    username : new FormControl('', [Validators.minLength(3),
      Validators.required]),
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', [Validators.minLength(8),
      Validators.required])
  });

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    const user = this.formSignUp.value;
    this.userService.signup(user).subscribe(
      data => {
        if ('msg' in data) {
          alert(data.msg);
        } else {
          this.userService.setToken(data.token);
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigateByUrl('lobby');
        }
      },
      error => {
        console.log(error);
        switch (error.status) {
          case 401 : {
            alert('Incorrect data haha');
            break;
          }
          case 500 : {
            alert('Guess what, something has crashed');
            break;
          }
        }
        console.log(error.status, error.statusText);
      }
    );
  }

  validate(control: string) {
    const formControl = this.formSignUp.get(control);

    return formControl.touched && formControl.invalid;
  }
}
