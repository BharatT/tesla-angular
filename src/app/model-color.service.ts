import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Color, Config, ConfigDetails, Model, Option } from './model.interface';

@Injectable()
export class ModelColorService {
  

  modelApiUrl = '/models';
  optionApiUrl = '/options/';
  selectedModel!: Model;
  selectedColor!: Color;
  activeStep2!: boolean;
  activeStep3!: boolean;
  selectConfig!:ConfigDetails;
  imagePath = new BehaviorSubject<string>("");
  notificationStep2Subject = new BehaviorSubject<boolean>(false);
  notificationStep3Subject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  setImage(url: string) {
    this.imagePath.next(url);
  }
  getImage() {
    return this.imagePath;
  }
  sendNotificationStep2(data: boolean) {
    this.notificationStep2Subject.next(data)
  }
  getNotificationStep2() {
    return this.notificationStep2Subject.asObservable();
  }
  sendNotificationStep3(data: boolean) {
    this.notificationStep3Subject.next(data)
  }
  getNotificationStep3() {
    return this.notificationStep3Subject.asObservable();
  }
  getModelsAndColors(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelApiUrl);
  }
  fetchOptions(id: string): Observable<Option> {
    const url = `${this.optionApiUrl}${id}`;
    return this.http.get<Option>(url);
  }
  isModelAndColorSelected(): boolean {
    return !!this.selectedModel && !!this.selectedColor;
  }
  setSelectedModelAndColor(selectedModel: Model, selectedColor: Color) {
    this.selectedModel = selectedModel;
    this.selectedColor = selectedColor;
  }
  getSelectedModelAndColor() {
    return {
      selectedModel: this.selectedModel,
      selectedColor: this.selectedColor
    }
  }
  

//  for setp 3 component purpose
  setConfig(selectedConfig:ConfigDetails) {
    this.selectConfig = selectedConfig;
  }
  getConfig() {
    return this.selectConfig;
  }

}
