import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, NgZone, OnInit } from '@angular/core';
import { ModelColorService } from '../model-color.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Color, Model } from '../model.interface';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
  // providers: [ModelColorService]
})
export class Step1Component implements OnInit {
  modelsList!: Model[];
  colorsList!: Color[];
  imageUrl:string="";
  selectedModel: any = 'Choose...';
  selectedColor: any;
  imageModel: any;
  imageName: any;
  storeSelectedResponseModel!: any[];
  storeSelectedResponseColor!: any[];
  constructor(private modelColorService: ModelColorService) {}

  ngOnInit(): void {
    this.fetchModels();
  }

  fetchModels(): void {
    this.modelColorService.getModelsAndColors().subscribe((response) => {
    
    this.modelsList = response;
  });
}
  onModuleSelect(){
    console.log("selectedModel", this.selectedModel);
    let modelID = this.selectedModel;
    let selectedResponseObject = this.modelsList.filter(data => {
      return data.code === modelID
    })
    this.storeSelectedResponseModel = selectedResponseObject;
    this.selectedColor = selectedResponseObject[0].colors[0].description;
    console.log(" this.selectedColor : ",  selectedResponseObject, "Color :", this.selectedColor)
    this.colorsList = selectedResponseObject[0].colors; 
    console.log("Color List : ", this.colorsList);
    this.imageModel = selectedResponseObject[0].code;
    this.imageName = selectedResponseObject[0].colors[0].code;
    this.imageUrl=`./assets/images/${this.imageModel}/${this.imageName}.jpg`;
    this.modelColorService.setImage(this.imageUrl);
    this.modelColorService.sendNotificationStep2(true);
    this.onModelColorSelect(this.storeSelectedResponseModel, this.colorsList[0]);
    console.log("this.imageUrl :", this.imageUrl)
    
  }
  onModelColorSelect(model:any, color:any) {
    this.modelColorService.setSelectedModelAndColor(model,color);
    }
  onColorSelect(){
    console.log("selectedModel", this.selectedColor);
    let colorSelectedObject = this.colorsList.filter(data => {
      return data.description === this.selectedColor
    })
    console.log("colorSelectedObject :", colorSelectedObject);
    this.storeSelectedResponseColor = colorSelectedObject
    this.imageName = colorSelectedObject[0].code;
    this.imageUrl=`./assets/images/${this.imageModel}/${this.imageName}.jpg`;
    console.log("Image Clolor :", this.imageUrl);
    this.modelColorService.setImage(this.imageUrl);
    this.modelColorService.setData('sharedKey', this.imageUrl);
    this.selectedColor = this.selectedColor;
    this.onModelColorSelect(this.storeSelectedResponseModel , this.storeSelectedResponseColor[0]);
    this.modelColorService.sendNotificationStep2(true);
        
  }
 

}
