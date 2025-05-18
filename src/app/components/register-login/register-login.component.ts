import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent {
  isSignup: boolean = false;
  hidePassword: boolean = true;
  RegisterForm: FormGroup;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar:MatSnackBar,  private user: UserService, private router: Router, ) 
  
  {
    this.RegisterForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword() 
  {
    this.hidePassword = !this.hidePassword;
  }

  showSignup() {
    this.isSignup = true;
    this.RegisterForm.reset();
  }

  onRegister() {
    if (this.RegisterForm.valid) {
      console.log('Signup form submitted', this.RegisterForm.value);
  
      const payload = {
        fullName: this.RegisterForm.value.fullname,
        email: this.RegisterForm.value.email,
        password: this.RegisterForm.value.password,
        mobileNumber: this.RegisterForm.value.mobile
      };
  
      this.user.register(payload).subscribe({
        next: (response: any) => {
          console.log('Registration Success:', response);
  
          this.snackBar.open('Registration Successful!', '', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
  
          // Optional: Navigate to login
          this.showLogin();
        },
        error: (err: any) => {
          console.error('Registration Failed:', err);
  
          this.snackBar.open('Registration Failed! Email may already be in use.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.RegisterForm.markAllAsTouched();
      this.snackBar.open('Please fill all fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }


  showLogin() {
    this.isSignup = false;
    this.loginForm.reset();
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Login Failed! Please fill valid Email and Password.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.user.login(payload).subscribe({
      next: (result: any) => {
        let token = result.data.accessToken;
        if (token.startsWith('Bearer ')) {
          token = token.replace('Bearer ', '');
        }

      // Store the token in localStorage
        localStorage.setItem('Token', token);
        localStorage.setItem('user', JSON.stringify(result.data.name));

        this.snackBar.open('Login Successful!', '', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });


        this.router.navigate(['/dashboard']); // navigate to dashboard
      },
      error: (err: any) => {
        this.snackBar.open('Login Failed! Please check your credentials.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
 
}
