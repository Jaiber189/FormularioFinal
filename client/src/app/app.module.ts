import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IndexComponent} from "./index/index.component";
import {NavComponent} from "./nav/nav.component";
import {NavService} from "./nav/nav.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleModalModule } from 'ngx-simple-modal';
import { BasicModalComponent } from './components/modals/basic-modal/basic-modal.component';
import { RegisterComponent } from './components/modals/register/register.component';
import { StudentService } from './index/students.service';

import { AngularBasicModalModule } from 'angular-basic-modal';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialog, MatDialogModule, MatSliderModule } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent,
    BasicModalComponent,
    RegisterComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSliderModule,
    MatDialogModule
  ],
  entryComponents: [
    BasicModalComponent,
    RegisterComponent,
    ErrorModalComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, 
    NavService,
    FormBuilder,
    StudentService,
    MatDialog,
    Overlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
