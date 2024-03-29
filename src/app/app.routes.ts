import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import {canActivateStep2} from './guards/step2.guard';
import { canActivateStep3 } from './guards/step3.guard';

export const routes: Routes = [
{ path: '', redirectTo: '/step1', pathMatch: 'full' },
{ path: 'step1', component: Step1Component },
{ path: 'step2', component: Step2Component, canActivate:[canActivateStep2]},
{ path: 'step3', component: Step3Component, canActivate:[canActivateStep3]},
{ path: '**', component: PageNotFoundComponent }
];
