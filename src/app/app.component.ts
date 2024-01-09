import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModelColorService } from './model-color.service';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from "./image/image.component";
import { NavComponent } from "./nav/nav.component";
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ModelColorService],
  templateUrl: './app.component.html',
  imports: [AsyncPipe, JsonPipe, RouterOutlet, CommonModule, HttpClientModule, FormsModule, RouterLink, RouterLinkActive, ImageComponent, NavComponent]
})
export class AppComponent implements OnInit {
  image: string = "";

  constructor(private modelColorService: ModelColorService) { }

  ngOnInit(): void {
    this.modelColorService.getImage().subscribe(imgUrl => {
      this.image = imgUrl;
    });
  }

}
