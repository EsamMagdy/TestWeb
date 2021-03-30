import { Component, OnInit } from '@angular/core';
import { Pricing } from 'src/app/packages/package.model';
import { Employee } from 'src/app/shared/model/employeFilteringData.model';
import { IndividualPricing } from 'src/app/shared/model/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';

@Component({
  selector: 'app-emplyee-details',
  templateUrl: './emplyee-details.component.html',
  styleUrls: ['./emplyee-details.component.css']
})
export class EmplyeeDetailsComponent implements OnInit {
  employee: Employee;
  pricing: IndividualPricing;
  constructor(private individualContractService: IndividualContractService) { }

  ngOnInit(): void {
    this.employee = this.individualContractService.individualContractReq.employee;
  }

}
