import { Component } from '@angular/core';
import { ModelColorService } from '../model-color.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
  // providers: [ModelColorService]
})
export class Step2Component {
  models: any[] = [];
  selectedModel: string = '';
  configs: any[] = [];
  selectedConfig: any = 'Choose...';;
  includeYoke: boolean = false;
  includeTow: boolean = false;
  
  constructor(private modelColorService: ModelColorService) { }

  ngOnInit(): void {
    // this.modelColorService.getModels().subscribe((data: any) => {
    //   this.models = data.models;
    // });
    this.fetchOptions('S')
  }
  fetchOptions(id: string): void {
    this.modelColorService.fetchOptions(id).subscribe((response) => {
      console.log('Options Response:', response);
      this.configs = response.configs;
      this.includeYoke = response.yoke;
      this.includeTow = response.towHitch;
    });
  }

  onSelectConfig(): void {
    let requiredSelectedConfig = {...this.selectedConfig, isYoke:(this.includeYoke), towHitch:(this.includeTow)}
    this.modelColorService.setConfig(requiredSelectedConfig);
    this.modelColorService.sendNotificationStep3(true);
    console.log(" Select Config : ", requiredSelectedConfig);
  }
}
