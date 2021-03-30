import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StepperComponent } from './stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationComponent } from './location/location.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageFilterComponent } from './packages/package-filter/package-filter.component';
import { PackageListComponent } from './packages/package-list/package-list.component';
import { PackageItemComponent } from './packages/package-list/package-item/package-item.component';
import { HeaderStepperComponent } from './stepper/header-stepper/header-stepper.component';
import { StepsModule } from 'primeng/steps';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { ActivePackage } from './shared/directive/panel-active.directive';
import {RadioButtonModule} from 'primeng/radiobutton';
import { EmployeePickSourceComponent } from './packages/employee-pick-source/employee-pick-source.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { HousingBuildingActive } from './shared/directive/housingBuilding-active.directive';
import { WorkerComponent } from './worker/worker.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {SliderModule} from 'primeng/slider';
import { EmployeesListComponent } from './worker/employees-list/employees-list.component';
import { EmployeeItemComponent } from './worker/employees-list/employee-item/employee-item.component';
import { EmployeesFilterComponent } from './worker/employees-filter/employees-filter.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { RequestDetailsComponent } from './request-details/request-details.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {AccordionModule} from 'primeng/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { RotateIcon } from './shared/directive/rotateIcon.directive';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';
import { ActiveEmployeeIcon } from './shared/directive/iconEmployeeActive.directive';
import {SkeletonModule} from 'primeng/skeleton';
import {DividerModule} from 'primeng/divider';
import { PricingDetailsComponent } from './request-details/pricing-details/pricing-details.component';
import { EmplyeeDetailsComponent } from './request-details/emplyee-details/emplyee-details.component';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { LoaderService } from './shared/service/loaderService.service';
import { LoaderInterceptor } from './shared/interceptor/loaderInterceptor.service';
import {ScrollTopModule} from 'primeng/scrolltop';
import {PaginatorModule} from 'primeng/paginator';
import { PaymentComponent } from './payment/payment.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { ContractSignatureComponent } from './contract-signature/contract-signature.component';
import {FileUploadModule} from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import { SafeHtmlPipe } from './shared/pipe/safeHtmlPipe.pipe';
import { SavedLocationsComponent } from './location/saved-locations/saved-locations.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NewLocationComponent } from './location/new-location/new-location.component';
import {GMapModule} from 'primeng/gmap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { MathRound } from './shared/pipe/mathRound.pipe';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthWelcomeComponent } from './auth/auth-welcome/auth-welcome.component';
import { PasswordModule } from "primeng/password";
import { CheckPasswordDirective } from './shared/directive/checkPasswordDirective.directive';
import { CheckEmailDirective } from './shared/directive/checkEmailDirective.directive';
import { CheckMobileDirective } from './shared/directive/checkMobile.directive';
import {InputNumberModule} from 'primeng/inputnumber';
import { VerifyCodeComponent } from './auth/verify-code/verify-code.component';
import { AuthInterceptorService } from './shared/interceptor/auth.interceptor';
import { TranslationManagementComponent } from './translation-management/translation-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    LocationComponent,
    PackagesComponent,
    PackageFilterComponent,
    PackageListComponent,
    PackageItemComponent,
    HeaderStepperComponent,
    ActivePackage,
    EmployeePickSourceComponent,
    WorkerComponent,
    ErrorPageComponent,
    EmployeesListComponent,
    EmployeeItemComponent,
    EmployeesFilterComponent,
    RequestDetailsComponent,
    RotateIcon,
    ActiveEmployeeIcon,
    PricingDetailsComponent,
    EmplyeeDetailsComponent,
    MyLoaderComponent,
    PaymentComponent,
    AttachmentsComponent,
    ContractSignatureComponent,
    SafeHtmlPipe,
    MathRound,
    SavedLocationsComponent,
    NewLocationComponent,
    OnlinePaymentComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AuthWelcomeComponent,
    CheckPasswordDirective,
    CheckEmailDirective,
    CheckMobileDirective,
    VerifyCodeComponent,
    TranslationManagementComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StepsModule,
    ToastModule,
    CommonModule,
    StepsModule,
    TabViewModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    CheckboxModule,
    ToastModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbwcRdDylRg2IoZhU9_LmWa7dD6YL85Xk'
    }),
    HttpClientModule,
    PanelModule,
    RadioButtonModule,
    MessagesModule,
    MessageModule,
    SliderModule,
    ScrollPanelModule,
    PanelMenuModule,
    AccordionModule,
    MatExpansionModule,
    ProgressSpinnerModule,
    DialogModule,
    SkeletonModule,
    DividerModule,
    ScrollTopModule,
    PaginatorModule,
    GalleriaModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    GMapModule,
    ConfirmDialogModule,
    PasswordModule,
    InputNumberModule
  ],
  providers: [MessageService,
    LoaderService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
