import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Model } from './model.interface';

@Injectable()
export class ModelColorService {
  

  modelApiUrl = '/models';
  optionApiUrl = '/options/';
  selectedModel!: any[];
  selectedColor!: any[];
  activeStep2!: boolean;
  activeStep3!: boolean;
  selectConfig!: {};
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
  fetchOptions(id: string): Observable<any> {
    const url = `${this.optionApiUrl}${id}`;
    return this.http.get(url);
  }
  isModelAndColorSelected(): boolean {
    return !!this.selectedModel && !!this.selectedColor;
  }
  setSelectedModelAndColor(selectedModel: any[], selectedColor: any[]) {
    this.selectedModel = selectedModel;
    this.selectedColor = selectedColor;
  }
  getSelectedModelAndColor() {
    return {
      selectedModel: this.selectedModel,
      selectedColor: this.selectedColor
    }
  }
  // setActiveStep2Link(){
  //      this.activeStep2 = (this.selectedModel && this.selectedColor) ? true: false;
  // }
  // getActiveStep2Link():boolean{
  //   return this.activeStep2;
  // }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Get data from localStorage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private dataSubject = new BehaviorSubject<string>('Initial Value');
  public data$ = this.dataSubject.asObservable();


  setConfig(selectedConfig: {}) {
    this.selectConfig = selectedConfig;
  }
  getConfig() {
    return this.selectConfig;
  }

}
