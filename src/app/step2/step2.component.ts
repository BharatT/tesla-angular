import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelColorService } from '../model-color.service';
import { Color, Config, ConfigDetails, Model } from '../model.interface';
@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})

export class Step2Component {
  models: Model[] = [];
  selectedModel: string = '';
  configs!: Config[];
  selectedConfig!: Config;
  modelColor!: { selectedModel: Model; selectedColor: Color; };
  includeYoke: boolean = false;
  includeTow: boolean = false;

  constructor(private modelColorService: ModelColorService) { }

  ngOnInit(): void {
    this.modelColor = this.modelColorService.getSelectedModelAndColor();
    let codeModel = this.modelColor.selectedModel.code;
    this.fetchOptions(codeModel);
  }
  fetchOptions(id: string): void {
    this.modelColorService.fetchOptions(id).subscribe((response) => {
      this.configs = response.configs;
      this.includeYoke = response.yoke ?? false;
      this.includeTow = response.towHitch ?? false;
    });
  }

  onSelectConfig(): void {
    if (this.selectedConfig) {
      let requiredSelectedConfig: ConfigDetails = { ...this.selectedConfig as Config, isYoke: (this.includeYoke), towHitch: (this.includeTow) }
      this.modelColorService.setConfig(requiredSelectedConfig);
      this.modelColorService.sendNotificationStep3(true);
    }
  }
}
