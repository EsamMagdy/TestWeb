import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecieveWorkerType } from 'src/app/shared/model/city.model';
import { EmployeePickSourceEnum } from 'src/app/shared/model/employeePickSourceEnum.model';
import {
  HousingBuilding,
  HowToRecieveWorker,
} from 'src/app/shared/model/individualContractReq.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-employee-pick-source',
  templateUrl: './employee-pick-source.component.html',
  styleUrls: ['./employee-pick-source.component.css'],
})
export class EmployeePickSourceComponent implements OnInit, OnDestroy {
  recieveWorkerType: RecieveWorkerType;
  RecieveWorkerType = RecieveWorkerType;
  deliveryCost: number;
  housingBuildings: HousingBuilding[] = [];
  EmployeePickSource = EmployeePickSourceEnum;
  employeePickSource: EmployeePickSourceEnum;
  HowToRecieveWorker = HowToRecieveWorker;
  howtoReceiveWorker: HowToRecieveWorker;
  showEmployeePickSource = false;
  showCompany = false;
  showWebsite = false;
  professionName: string;
  nationalityId: string;
  subscribtion: Subscription;
  constructor(
    private packageService: PackageService,
    private individualContractService: IndividualContractService
  ) {}

  ngOnInit(): void {
    this.packageService.packages.subscribe((data) => {
      if (!data || data.length == 0) this.showEmployeePickSource = false;
      else this.showEmployeePickSource = true;
    });
    this.packageService.getCity().subscribe((city) => {
      this.recieveWorkerType = city.recieveWorkerType;
      this.deliveryCost = city.individualContractDeliveryCost;
    });

    this.packageService
      .getHousingBuildingForIndividualContract()
      .subscribe((data) => {
        this.housingBuildings = data;
      });
    this.subscribtion = this.individualContractService.professionName.subscribe(
      (data: any) => {
        this.professionName = data[0];
        this.nationalityId = data[1];
      }
    );
  }
  employeePickSourceClick() {
    if (this.employeePickSource === this.EmployeePickSource.Company) {
      this.showCompany = true;
      this.showWebsite = false;
    }
    if (this.employeePickSource === this.EmployeePickSource.Website) {
      this.howtoReceiveWorker = null;
      this.showCompany = false;
      this.showWebsite = true;
    }
    this.packageService.employeePickSource.next({
      employeePickSource: this.employeePickSource,
      howtoReceiveWorker: 0,
      recieveEmployeeFromHousing: '',
    });
  }
  howToRecieveWorkerClick() {
    if (this.howtoReceiveWorker === this.HowToRecieveWorker.Delivery)
      this.showCompany = false;
    if (this.howtoReceiveWorker === this.HowToRecieveWorker.FromBranch)
      this.showCompany = true;
    this.packageService.employeePickSource.next({
      employeePickSource: this.employeePickSource,
      howtoReceiveWorker: this.howtoReceiveWorker,
      recieveEmployeeFromHousing: '',
    });
  }
  onChooseHousing(housingBuildingId: string) {
    this.packageService.employeePickSource.next({
      employeePickSource: this.employeePickSource,
      howtoReceiveWorker: this.howtoReceiveWorker,
      recieveEmployeeFromHousing: housingBuildingId,
    });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
