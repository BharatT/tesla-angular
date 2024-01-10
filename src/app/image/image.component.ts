import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModelColorService } from '../model-color.service';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit {
  
  constructor(private modelColorService: ModelColorService) {}

imagePath!:string;
@Input('imageUrl') imageUrl!:string ;
ngOnInit(): void {
  this.modelColorService.getImage().subscribe(data=>{
    this.imagePath = data;
  });
  
 }

}
