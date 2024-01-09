import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModelColorService } from '../model-color.service';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  // providers: [ModelColorService]
})
export class ImageComponent implements OnInit, OnChanges {
  sharedData: any;

  constructor(private modelColorService: ModelColorService) {}

imagePath!:string;
@Input('imageUrl') imageUrl!:string ;
ngOnInit(): void {
  this.modelColorService.getImage().subscribe(data=>{
    this.imagePath = data;
  });
  // this.imagePath = this.imageUrl
  // console.log("Init Image PAth : ",this.imagePath)
  // this.sharedData = this.modelColorService.getData('sharedKey');
  // console.log(" Shared : ", this.sharedData)
  // this.modelColorService.data$.subscribe(data => {
  //   this.imagePath = data; // Assign received data to a component property
  //   console.log("Image update in image", this.imagePath)
  // });
 }
ngOnChanges(changes: SimpleChanges): void {
  console.log("Changes", changes, this.imageUrl)
}
}
