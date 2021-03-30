import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { EmployeePickSource } from '../shared/model/application/employeePickSource.model';
import { FilterPackageData } from '../shared/model/application/filterPackageData.model';
import { EmployeePickSourceEnum } from '../shared/model/employeePickSourceEnum.model';
import { HowToRecieveWorker } from '../shared/model/individualContractReq.model';
import { IndividualPricing } from '../shared/model/individualPricing.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';
import { PackageService } from './package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  @ViewChild('errorMessages') errorMessages: ElementRef;
  error: Message[] = [];
  errors: Message[];
  filterData: FilterPackageData;
  pricing: IndividualPricing;
  pricings: IndividualPricing[];
  EmployeePickSource = EmployeePickSourceEnum;
  HowToRecievHowrker: HowToRecieveWorker;
  employeePickSource: EmployeePickSource;
  constructor(
    private individualContractService: IndividualContractService,
    private packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.packageService.filteringData.subscribe((data) => {
      this.filterData = data;
    });

    this.packageService.packageChoosed.subscribe((data) => {
      this.pricing = data;
    });
    this.packageService.packages.subscribe((data) => {
      this.pricings = data;
    });
    this.packageService.employeePickSource.subscribe((data) => {
      this.employeePickSource = data;
    });
  }
  locationPage() {
    this.router.navigate(['/location'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
  workerPage() {
    if (!this.pricing)
      this.error.push({
        severity: 'error',
        summary: 'Error',
        detail: 'Please Choose Package',
      });
    if (!this.employeePickSource)
      this.error.push({
        severity: 'error',
        summary: 'Error',
        detail: `Please Choose How To ${this.filterData.profession.value}`,
      });
    if (this.employeePickSource && !this.employeePickSource.employeePickSource)
      this.error.push({
        severity: 'error',
        summary: 'Error',
        detail: `Please Choose How To ${this.filterData.profession.value}`,
      });
    if (
      this.employeePickSource &&
      this.employeePickSource.employeePickSource ==
        this.EmployeePickSource.Website
    ) {
      if (!this.employeePickSource.howtoReceiveWorker)
        this.error.push({
          severity: 'error',
          summary: 'Error',
          detail: 'Please choose a delivery method',
        });
      if (
        this.employeePickSource.howtoReceiveWorker ===
          HowToRecieveWorker.FromBranch &&
        !this.employeePickSource.recieveEmployeeFromHousing
      )
        this.error.push({
          severity: 'error',
          summary: 'Error',
          detail: 'Please choose a housing building',
        });
    }
    if (
      this.employeePickSource &&
      this.employeePickSource.employeePickSource ==
        this.EmployeePickSource.Company &&
      !this.employeePickSource.recieveEmployeeFromHousing
    )
      this.error.push({
        severity: 'error',
        summary: 'Error',
        detail: 'Please choose a housing building',
      });

    this.errors = this.error;
    this.error = [];
    // this.errorMessages.el.nativeElement;

    if (this.errors.length > 0) return;

    this.setIndividualContractReqValues();

    if (
      this.employeePickSource.employeePickSource ===
        EmployeePickSourceEnum.Website &&
      this.employeePickSource.howtoReceiveWorker === HowToRecieveWorker.Delivery
    )
      this.router.navigate(['/worker'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
    if (
      this.employeePickSource.employeePickSource ===
        EmployeePickSourceEnum.Company ||
      this.employeePickSource.howtoReceiveWorker ===
        HowToRecieveWorker.FromBranch
    )
      this.router.navigate(['/requestDetails'], {
        queryParams: {
          stepId: this.individualContractService.individualContractReq.stepId,
        },
      });
  }

  setIndividualContractReqValues() {
    this.individualContractService.individualContractReq.professionId =
      '' + this.filterData.profession.key;
    this.individualContractService.individualContractReq.professionName = this.filterData.profession.value;
    this.individualContractService.individualContractReq.nationalityId = this.filterData.nationality.nationalityId;
    this.individualContractService.individualContractReq.nationalityId ==
      this.filterData.nationality.nationalityName;
    this.individualContractService.individualContractReq.pricing = this.pricing;
    this.individualContractService.individualContractReq.employeePickSource = this.employeePickSource.employeePickSource;
    this.individualContractService.individualContractReq.howtoReceiveWorker = this.employeePickSource.howtoReceiveWorker;
    this.individualContractService.individualContractReq.recieveEmployeeFromHousing = this.employeePickSource.recieveEmployeeFromHousing;
  }
}
