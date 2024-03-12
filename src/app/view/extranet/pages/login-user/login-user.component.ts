import { Component, ElementRef, NgZone, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInUser, SignInUserForm, SignUpUser } from '../../../../core/models/User.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../core/service/authentication.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { detectError } from '../../../../core/utils/form.utils';
import { finalize } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [NzFormModule, ReactiveFormsModule, RouterLink ,  NzIconModule  ,FormsModule , NzInputModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss'
})
export class LoginUserComponent {

  authentificationService = inject(AuthenticationService)
  router = inject(Router);
  route = inject(ActivatedRoute);

  @ViewChild('googleButton') googleButton!: ElementRef;

  form : FormGroup<SignInUserForm> = new FormGroup({
    email : new FormControl('' , {validators : Validators.compose([Validators.required]) , nonNullable : true }),
    password : new FormControl('' , {validators : Validators.compose([Validators.required]) , nonNullable : true }),
  }) ;

  errorLogin  = signal(false);
  loading = signal(false);
  hide = signal(true);
  queryParam = signal<{[key : string ] : any}>({});



  constructor( private NgZone : NgZone) {
    this.route.queryParams.subscribe((query) => {
      this.queryParam.set(query);
    })
  }

  ngOnInit(): void {
    this.initGoogle();
  }


initGoogle(){
 /* this.NgZone.runOutsideAngular(() => {
      google.accounts.id.initialize({
        client_id: '930343312248-5v7hdfgf2ckaalo5hffc5tq76ffvqr3p.apps.googleusercontent.com', // Reemplaza con tu ID de cliente de Google
        callback: (response: any) => {
          this.NgZone.run(() => {
            // Maneja la respuesta del inicio de sesión aquí
            this.SingUpGoogle(response);
          });
        }
      });

      google.accounts.id.renderButton(this.googleButton.nativeElement, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'login_with',  // Cambiado de 'signup_with' a 'login_with'
        shape: 'rectangular',
        logo_alignment: 'left',
        context: 'signin',
        ux_mode: 'popup',
        auto_prompt: false
      });
    });*/
  }


  initSession(){
    this.errorLogin.set(false);
    const data : SignInUser = {
      email : this.form.value.email!,
      password : this.form.value.password!
    }

    this.loading.set(true)
    this.authentificationService.signIn(data).pipe(finalize(() => this.loading.set(false))).subscribe({
      next : (r) => {
        if (Object.keys(this.queryParam()).length != 0){
          this.router.navigate([this.queryParam()['redirectTo']])
        }else{
          this.router.navigate(["/"])
        }
        this.authentificationService.storageToken(r.token)
      },
      error : () => {this.errorLogin.set(true)}
    })
  }


  SingUpGoogle(response : any){
    console.log(response)
  }

  updateShow(){
    this.hide.update((b) => !b)
  }
}
