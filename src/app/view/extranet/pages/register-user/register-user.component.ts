import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SignUpUser, SignUpUserForm } from '../../../../core/models/User.model';
import { detectError } from '../../../../core/utils/form.utils';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../../core/service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [NzFormModule,  NzGridModule,RouterLink,  CommonModule,NzInputModule , NzIconModule, FormsModule , ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  authentificationService = inject(AuthenticationService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  loading = signal(false);
  queryParam = signal<{[key : string ] : any}>({});

  form : FormGroup<SignUpUserForm> = new FormGroup({
    email : new FormControl(''  , {validators : Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]) , nonNullable : true}),
    firstName : new FormControl(''  , {validators : Validators.required , nonNullable : true}),
    lastName : new FormControl(''  , {validators : Validators.required , nonNullable : true}),
    password : new FormControl(''  , {validators : Validators.required , nonNullable : true}),
    confirmPassword : new FormControl(''  , {validators : Validators.required , nonNullable : true})
  }, {
    validators : comparePassword()
  })

  constructor(){
    this.route.queryParams.subscribe((query) => {
      this.queryParam.set(query);
    })
  }

  get f() {
    return this.form.controls;
  }

  signUp(){
    if(this.form.valid){
      this.loading.set(true);
      const val = this.form.value;
      const data : SignUpUser ={
        email : val.email!,
        firstName : val.firstName!,
        lastName : val.lastName!,
        password : val.password!
      }
      this.authentificationService.signUp(data).pipe(finalize(() => this.loading.set(false))).subscribe({
        next : (r) => {
          if (Object.keys(this.queryParam()).length != 0){
            this.router.navigate([this.queryParam()['redirectTo']])
          }else{
            this.router.navigate(["/"])
          }
          this.authentificationService.storageToken(r.token)
        },
        error : (err  : HttpErrorResponse) => {{
          if (err.error)
            Object.keys(err.error).forEach((filedName) => {
              this.form.get(filedName)?.setErrors({err : err.error[filedName] })
            } )
        }}
      })
    }else{
      detectError(this.form);
    }
  }

}

export function comparePassword(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if ( control.get('password')?.value !== control.get('confirmPassword')?.value  && control.get('confirmPassword')?.value != ''   ){
      return  { 'compareError': true };
    }
    return null;
  };
}
