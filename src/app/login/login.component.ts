import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
      sessionStorage.clear();
  }
  qrCode: any;
  result: any;
  value: any = null;
  //loginForm2: any = {};
  encodedString: any;
  decodedString: any;
  dec2: any;
  showForm = false;
  inputNumber: string = '';

  loginForm = this.builder.group({
    login: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  loginForm2 = this.builder.group({
   // auth_session: this.builder.control('', Validators.required),
    key: this.builder.control('', Validators.required)
  });

  proceedLogin1() {
    if (this.loginForm.valid) {
      this.service.proceedLogin(this.loginForm.value).subscribe(item => {
        this.result = item;        
        sessionStorage.setItem('auth_session', this.result.auth_session)
          if (this.result.qrImage) {
          sessionStorage.setItem('qrcode', this.result.qrImage)
          this.qrCode = this.result.qrImage;
          this.value = "qrcode-container";
          this.toastr.info('Please scan qr-code with your cellphone')
          this.showForm = true;
        } else if (!this.result.qrImage) {
          this.toastr.info('Please put the number from app');
          this.showForm = true;
        } else {
          this.toastr.error('Invalid credentials');
        }
        // if (this.result.password === this.loginForm.value.password) {
        //   if (this.result.isActive) {
        //     sessionStorage.setItem('username',this.result.id);
        //     sessionStorage.setItem('role',this.result.role);
        //     this.router.navigate(['']);
        //   } else {
        //     this.toastr.error('Please contact Admin', 'InActive User');
        //   }
        // } 
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  proceedLogin2() {
    // this.loginForm2['key'] = this.inputNumber;
    // this.loginForm2['auth_session'] = sessionStorage.getItem('auth_session');
    const data = {
      ...this.loginForm2.value,
      auth_session: sessionStorage.getItem('auth_session')
    }
    this.service.proceedLogin(data).subscribe( item => {
      this.toastr.success('Congratulation! You have entered!');
      this.router.navigate(['']);
      console.log(item)
    })
  }
}