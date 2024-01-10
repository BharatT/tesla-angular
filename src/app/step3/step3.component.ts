import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModelColorService } from '../model-color.service';
import { ConfigDetails, ModelColor } from '../model.interface';
@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {
  configData!: ConfigDetails;
  modelColor!:ModelColor;
  modelOption!:ConfigDetails;
  modelName!:string;
  modelPrice!:number;
  modelColorPrice!:number;
  modelColorCar!:string;
  modelDescription!:string;
  isYoke!: boolean | number ;
  isTowHitch!: boolean | number;
  configRange!: number;
  configSpeed!: number;
  totalCost!: number;
  constructor(private modelColorService: ModelColorService) { }
  ngOnInit(): void {
    this.configData = this.modelColorService.getConfig();
    this.modelColor = this.modelColorService.getSelectedModelAndColor();
    this.modelOption = this.modelColorService.getConfig()
    if(this.configData){
      this.modelName = this.modelColor.selectedModel.description;
      this.modelColorPrice = this.modelColor.selectedColor.price;
      this.modelColorCar = this.modelColor.selectedColor.description;
      this.modelPrice = this.configData.price;
      this.modelDescription = this.configData.description;
      this.configRange = this.configData.range;
      this.configSpeed = this.configData.speed;
      this.isTowHitch = this.modelOption.towHitch??false;
      this.isYoke = this.modelOption.towHitch??false;
      this.totalCost = +(this.modelPrice + this.modelColorPrice + this.modelColorPrice + +(this.isTowHitch?1000:0) + +(this.isYoke?1000:0));
    } 
  }

}
