import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/fragment/header/header/header.component';
import { LoginComponent } from './pages/login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatRadioModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './pages/registration/registration/registration.component';
import { EmployeeProfileComponent } from './pages/employee/employee-profile/employee-profile.component';
import { ToastrModule } from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SknTraderComponent } from './pages/skn-trader/skn-trader.component';
import { HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './pages/line-chart/line-chart.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    EmployeeProfileComponent,
    ProductListComponent,
    SknTraderComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot() ,
    MatGridListModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
