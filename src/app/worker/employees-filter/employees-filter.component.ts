import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { filter } from 'rxjs/operators';
import { EmployeFilteringData } from 'src/app/shared/model/employeFilteringData.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-employees-filter',
  templateUrl: './employees-filter.component.html',
  styleUrls: ['./employees-filter.component.css']
})
export class EmployeesFilterComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('filterDataForm') filterDataForm: NgForm;
  age: number[] = [18, 50];
  maxNumberToDisplay: number=5;
  selectedRelegion: number[] = [];
  selectedMaritalStatus: number[] = [];
  selectedExpreience: number[] = [];
  showDriver = false;
  selectedCities: string[] = [];
  rangeValues: number[] = [18, 50];
  val1: number;
  constructor(private individualContractService: IndividualContractService,
    private wokerService: WorkerService) { }

  ngOnInit(): void {
    let professionName = this.individualContractService.individualContractReq.professionName;
    if (professionName.toLowerCase().includes('driver') || professionName.toLowerCase().includes('سائق'))
      this.showDriver = true;

  }
  onFilterData() {
    let professionId = this.individualContractService.individualContractReq.professionId;
    let nationalityId = this.individualContractService.individualContractReq.nationalityId;
    let professionName = this.individualContractService.individualContractReq.professionName;

    let filterData = new EmployeFilteringData();
    let formValue = { ...this.filterDataForm.value };

    for (let prop in formValue)
      if (!formValue[prop])
        delete formValue[prop];

    filterData = Object.assign(<EmployeFilteringData>formValue, filterData);

    let newAge = "";
    (<[]>this.filterDataForm.value.age).forEach(d => {
      newAge += d + ";";
      console.log(d);
    });
    newAge = newAge.slice(0, -1);

    if (!this.filterDataForm.value.pageSize)
      filterData.pageSize = 10;

    filterData.age = newAge;
    filterData.nationalityId = nationalityId;
    filterData.professionId = professionId;
    filterData.professionName = professionName;
    filterData.pageIndex = 1;

    this.wokerService.showEmployeeList.next(true);
    document.getElementById('headerClass').scrollIntoView();
    this.wokerService.getemplyeeFilter(filterData).subscribe();
  }
  onClearForm(){
    this.filterDataForm.reset();
    this.age=[18, 50];
  }
}
