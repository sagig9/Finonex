import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    SideBarComponent
  ],
  imports: [
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule,
    PanelModule,
    DividerModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: EmployeesComponent, pathMatch: 'full' },
      { path: 'employees', component: EmployeesComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
    ])

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
