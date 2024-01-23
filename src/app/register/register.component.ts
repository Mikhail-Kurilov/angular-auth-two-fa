import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder, private toastr:ToastrService, private service:AuthService, private router:Router){
    
  } 
  //Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]) 

  registerForm=this.builder.group({
    login:this.builder.control('', Validators.required),
    name:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required),
    //email:this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    //role:this.builder.control(''),
   // isActive:this.builder.control(false)
  })

  proceedRegistration(){
    if(this.registerForm.valid ) {
      this.service.proceedRegister(this.registerForm.value).subscribe(res => {
        this.toastr.success('Please contact admin to enable access','Registered successfully');
        this.router.navigate(['login']);
      })
    }else {
      this.toastr.warning('Please enter valid data');
    }
  } 

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.service.addUser({ name } as User)
  //     .subscribe(user => {
  //       this.users.push(user);
  //     });
  // }
}  
