import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGurad } from './auth/auth.guard';
import { ContractSignatureComponent } from './contract-signature/contract-signature.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LocationComponent } from './location/location.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { PackagesComponent } from './packages/packages.component';
import { PaymentComponent } from './payment/payment.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { TranslationManagementComponent } from './translation-management/translation-management.component';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [
  { path: '', redirectTo: '/location', pathMatch: 'full' },
  {
    path: 'location',
    component: LocationComponent,
    canActivate:[AuthGurad]
  },
  {
    path: 'packages',
    component: PackagesComponent,
  },
  {
    path: 'worker',
    component: WorkerComponent,
  },
  {
    path: 'requestDetails',
    component: RequestDetailsComponent,
  },
  {
    path: 'contract',
    component: ContractSignatureComponent,
  },
  {
    path: 'attachments',
    component: AttachmentsComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'onlinePayment',
    component: OnlinePaymentComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {path:'translationManagement',component:TranslationManagementComponent},
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
