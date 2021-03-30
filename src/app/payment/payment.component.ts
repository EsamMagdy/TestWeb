import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualContractReq } from '../shared/model/individualContractReq.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  indContReq: IndividualContractReq;
  deservedAmount: number;
  constructor(private individualContractService: IndividualContractService,
              private router:Router) { }

  ngOnInit(): void {
    this.indContReq = this.individualContractService.indContReqCreated;
    this.deservedAmount = Math.round(this.indContReq.finalPrice??0) + Math.round(this.indContReq.deliveryCost??0);
  }
  attachmentPage() {
this.router.navigate(['attachments']);
  }

}
