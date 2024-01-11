import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, Router } from '@angular/router';
import { ModelColorService } from '../model-color.service';
import { inject } from '@angular/core';

export const  canActivateStep2: CanActivateFn =(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> {
  const modelColorService = inject(ModelColorService);
  const router = inject(Router) 
 if (modelColorService.isModelAndColorSelected()) {
      return true;
    } else {
      router.navigate(['/step1']);
      return false;
    }
  
}