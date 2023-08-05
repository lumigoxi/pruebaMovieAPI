import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule, HttpClientModule],
  exports: [FilterPipe],
})
export class SharedModule {}
