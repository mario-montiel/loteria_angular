import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit  {
  formLogin = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
  }

  submit() {
    const user = this.formLogin.value;
    this.userService.login(user).subscribe(
      data => {
        console.log(data);
        this.userService.setToken(data.token);
        sessionStorage.setItem('user', JSON.stringify(data));
        this.router.navigateByUrl('');
      },
      error => {
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
    const formControl = this.formLogin.get(control);

    return formControl.touched && formControl.invalid;
  }
}
