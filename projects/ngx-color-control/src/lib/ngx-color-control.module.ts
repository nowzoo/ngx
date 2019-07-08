import { NgModule } from '@angular/core';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorControlComponent } from './color-control/color-control.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ColorSliderComponent, ColorPaletteComponent, ColorControlComponent],
  imports: [
    CommonModule
  ],
  exports: [ColorSliderComponent, ColorPaletteComponent, ColorControlComponent]
})
export class NgxColorControlModule { }
