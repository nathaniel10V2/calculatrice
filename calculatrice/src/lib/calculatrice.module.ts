import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list'
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { CalculatriceComponent } from './calculatrice.component';

const component = [CalculatriceComponent]

@NgModule({
declarations: [
	CalculatriceComponent
],  
imports: [
    BrowserModule,
	CommonModule,
	MatGridListModule,
	FormsModule,
	MatRadioModule,
	MatButtonModule,
	MatListModule,
	MatCardModule,
  ]
})
export class CalculatriceModule { }
