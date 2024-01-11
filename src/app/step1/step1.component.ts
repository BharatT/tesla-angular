import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelColorService } from '../model-color.service';
import { Color, Model } from '../model.interface';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit {
  modelsList!: Model[];
  colorsList!: Color[];
  imageUrl:string="";
  selectedModel: string = 'Choose...';
  selectedColor!: string;
  imageModel!: string;
  imageName!: string;
  storeSelectedResponseModel!: Model;
  storeSelectedResponseColor!: Color[];
  constructor(private modelColorService: ModelColorService) {}

  ngOnInit(): void {
    this.fetchModels();
    this.modelColorService.sendNotificationStep3(false);
    this.modelColorService.sendNotificationStep2(false);
  }

  fetchModels(): void {
    this.modelColorService.getModelsAndColors().subscribe((response) => {
    this.modelsList = response;
  });
}
  onModuleSelect(){
    let modelID = this.selectedModel;
    let selectedResponseObject:Model = this.modelsList.filter(data => {
      return data.code === modelID
    })[0]
    this.storeSelectedResponseModel = selectedResponseObject;
    this.selectedColor = selectedResponseObject.colors[0].description;
    this.colorsList = selectedResponseObject.colors; 
    this.imageModel = selectedResponseObject.code;
    this.imageName = selectedResponseObject.colors[0].code;
    this.imageUrl=`./assets/images/${this.imageModel}/${this.imageName}.jpg`;
    this.modelColorService.setImage(this.imageUrl);
    this.modelColorService.sendNotificationStep2(true);
    this.onModelColorSelect(this.storeSelectedResponseModel, this.colorsList[0]);
    
  }
  onModelColorSelect(model:Model, color:Color) {
    this.modelColorService.setSelectedModelAndColor(model,color);
    }
  onColorSelect(){
    let colorSelectedObject = this.colorsList.filter(data => {
      return data.description === this.selectedColor
    })
    this.storeSelectedResponseColor = colorSelectedObject
    this.imageName = colorSelectedObject[0].code;
    this.imageUrl=`./assets/images/${this.imageModel}/${this.imageName}.jpg`;
    this.modelColorService.setImage(this.imageUrl);
    this.selectedColor = this.selectedColor;
    this.onModelColorSelect(this.storeSelectedResponseModel , this.storeSelectedResponseColor[0]);
    this.modelColorService.sendNotificationStep2(true);
        
  }
 

}
