import { Component, OnInit } from '@angular/core';
import { ModelColorService } from '../model-color.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {
  configData!:any;
  modelColor!:any;
  modelOption!:any;
  modelName!:string;
  modelPrice!:string;
  modelColorPrice!:string;
  modelColorCar!:string;
  modelDescription!:string;
  isYoke!: string;
  isTowHitch!: string;
  configRange!: string;
  configSpeed!: string;
  totalCost!: number;
  constructor(private modelColorService: ModelColorService) { }
  ngOnInit(): void {
    this.configData = this.modelColorService.getConfig();
    this.modelColor = this.modelColorService.getSelectedModelAndColor();
    this.modelOption = this.modelColorService.getConfig()
    console.log(" Config :", this.configData, "Model Color : ", this.modelColor, "Model Option", this.modelOption)
    if(this.configData){
      this.modelName = this.modelColor.selectedModel[0].description;
      this.modelColorPrice = this.modelColor.selectedColor.price;
      this.modelColorCar = this.modelColor.selectedColor.description;
      this.modelPrice = this.configData.price;
      this.modelDescription = this.configData.description;
      this.configRange = this.configData.range;
      this.configSpeed = this.configData.speed;
      this.isTowHitch = this.modelOption.towHitch;
      this.isYoke = this.modelOption.towHitch;
      this.totalCost = +(this.modelPrice + this.modelColorPrice + (this.isTowHitch?this.isTowHitch:0) + (this.isYoke?this.isYoke:0));
    }
    
  }

}
