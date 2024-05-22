import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

export const userInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  if(authenticationService.retriveToken()){
    req = req.clone({
      setHeaders : {Authorization: `Bearer ${authenticationService.retriveToken()}`,}
    })
  }

  return next(req).pipe(catchError((err : HttpErrorResponse) =>  {
    if(err.status === HttpStatusCode.Unauthorized){
      authenticationService.logout();
      router.navigate(["/signIn"] , {queryParams : {redirectTo : router.url}})
      return of()
    }
    throw (err);
  }));
};
