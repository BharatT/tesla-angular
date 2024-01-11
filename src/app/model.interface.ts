export interface Model {
    code:        string;
    description: string;
    colors:      Color[];
}

export interface Color {
    code:        string;
    description: string;
    price:       number;
}

export interface ModelConfigData {
    [key:string]: Model;
}
export interface Config {
    description: string;
    id: number;
    price: number;
    range: number;
    speed: number;
}
export interface Option{
    configs:Config[];
    towHitch?:boolean;
    yoke?:boolean;
}
export interface ConfigDetails extends Config{
    towHitch?:boolean;
    isYoke?:boolean
}

export interface ModelColor{
    selectedModel: Model;
  selectedColor: Color;
}

export interface CheckboxOptions {
    includeTow: boolean;
    includeYoke: boolean;
  }