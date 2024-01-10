import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, Router } from '@angular/router';
import { ModelColorService } from '../model-color.service';
import { inject } from '@angular/core';

export function canActivateStep2(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    const modelColorService = inject(ModelColorService);
    const router = inject(Router) 

    if (modelColorService.isModelAndColorSelected()) {
      return true;
    } else {
      router.navigate(['/step1']);
      return false;
    }
  };
}