import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModelColorService } from '../model-color.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  // providers: [ModelColorService]
})
export class NavComponent implements OnInit {
  linkEnabledStep2:boolean = false;
  linkEnabledStep3:boolean = false;
  constructor( private modelColorService:ModelColorService) {}
  ngOnInit(): void {
    this.modelColorService.getNotificationStep2().subscribe(d=>{
      this.linkEnabledStep2 = d;
     });
    this.modelColorService.getNotificationStep3().subscribe(d=>{
      this.linkEnabledStep3 = d;
     });
  }
}
