import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnexionRoutingModule } from './connexion-routing.module';

import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ConnexionRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ConnexionModule { }
