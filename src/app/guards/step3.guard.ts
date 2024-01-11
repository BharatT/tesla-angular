import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ModelColorService } from '../model-color.service';

export const  canActivateStep3: CanActivateFn =(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> {
  const modelColorService = inject(ModelColorService);
  const router = inject(Router) 
 if (modelColorService.isModelAndColorSelected()) {
      return true;
    } else {
      router.navigate(['/step1']);
      return false;
    }
  
}