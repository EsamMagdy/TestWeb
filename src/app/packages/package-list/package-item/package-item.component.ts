import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualPricing } from 'src/app/shared/model/individualPricing.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { PackageService } from '../../package.service';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.less'],
})
export class PackageItemComponent implements OnInit {
  packages: IndividualPricing[] = [];
  packageSelected:IndividualPricing;
  constructor(
    private packageService: PackageService,
    private individualContractService: IndividualContractService
  ) {}

  ngOnInit(): void {
    this.packageService.packages.subscribe((packages) => {
      packages.forEach((item) => {
        item.isSelected = false;
      });
      this.packages = packages;
    });
  }
  onChoosePackage(pricing: IndividualPricing) {
    this.packages.forEach((x) => {
      if (x.id != pricing.id) x.isSelected = false;
    });
    pricing.isSelected = true;
    this.packageSelected = pricing;
    this.packageService.packageChoosed.next(pricing);
  }
}
