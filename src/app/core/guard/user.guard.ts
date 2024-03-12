import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authentificationService = inject(AuthenticationService);
  const router = inject(Router)
  if (authentificationService.retriveToken()){
    router.navigate(["/"])
    return false;
  }
  return true;
};
