import { Component, OnInit } from '@angular/core';
import { HowToRecieveWorker } from 'src/app/shared/model/individualContractReq.model';
import { IndividualPricing } from 'src/app/shared/model/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';

@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.component.html',
  styleUrls: ['./pricing-details.component.css']
})
export class PricingDetailsComponent implements OnInit {
  pricing: IndividualPricing;
  HowToRecieveWorker = HowToRecieveWorker;
  requestDate: string;
  packagePrice: number;
  discount: number;
  amountafterdiscount: number;
  vatAmount: number;
  activationAmount: number;
  contractPriceWithVat: number;
  contractAmount: number;
  sanadAmount: number;
  prePaid: number;
  monthlyPaid: number;
  deliveryCost: number;
  insurancePaymentMethod: number;
  howtoReceiveWorker: number;

  constructor(private individualContractService: IndividualContractService) { }

  ngOnInit(): void {
    this.pricing = this.individualContractService.individualContractReq.pricing;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.requestDate = dd + '/' + mm + '/' + yyyy;

    this.packagePrice = Math.round(this.pricing.contractpricewithoutvat);
    this.discount = Math.round(this.pricing.discount);
    this.amountafterdiscount = Math.round(this.pricing.amountafterdiscount);
    this.vatAmount = Math.round(this.pricing.vatamount);
    this.activationAmount = Math.round(this.pricing.activationAmount);
    this.contractPriceWithVat = Math.round(this.pricing.contractpricewithoutvat);
    this.contractAmount = Math.round(this.pricing.contractAmount);
    this.sanadAmount = Math.round(this.pricing.sanadAmount);
    this.prePaid = Math.round(this.pricing.prePaid);
    this.monthlyPaid = Math.round(this.pricing.monthlyPaid);
    this.deliveryCost = Math.round(this.individualContractService.individualContractReq.deliveryCost);
    this.insurancePaymentMethod = this.individualContractService.individualContractReq.insurancePaymentMethod;
    this.howtoReceiveWorker = this.individualContractService.individualContractReq.howtoReceiveWorker;
  }


}
