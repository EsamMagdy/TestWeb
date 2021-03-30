import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeyValuePairs } from 'src/app/shared/model/keyValuePairs.model';
import { NationalityWithEmpAvailableNumber } from 'src/app/shared/model/nationalityWithEmpAvailableNumber.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-filter',
  templateUrl: './package-filter.component.html',
  styleUrls: ['./package-filter.component.css']
})
export class PackageFilterComponent implements OnInit {
  @ViewChild('filterForm') filterForm: NgForm;
  professions: KeyValuePairs[]=null;
  nationalities: NationalityWithEmpAvailableNumber[]=null;
  professionId: string;
  nationalityId: string;
  selectedProfession: KeyValuePairs;
  selectedNationality: NationalityWithEmpAvailableNumber;

  constructor(private packageService: PackageService,
    private individualContractService: IndividualContractService) { }

  ngOnInit(): void {
    this.packageService.getProfessions()
      .subscribe(data => {
        this.professions = data;
        this.selectedProfession = this.professions[1];
        this.onChangeProfession(this.selectedProfession);
        this.professionId = '' + this.selectedProfession.key;
        this.packageService.filteringData.next({ nationality: this.selectedNationality, profession: this.selectedProfession });
      });


  }
  onChangeProfession(profession: KeyValuePairs) {
    this.packageService.getNationalitiesByProfession('' + profession.key)
      .subscribe(data => {
        if (data.length > 0) {
          this.nationalities = data;
          this.selectedNationality = this.nationalities[0];
          this.nationalityId = this.selectedNationality.nationalityId
          this.loadPackages(this.professionId, this.nationalityId);
          this.individualContractService.setProfessionAndNationality(this.selectedProfession, this.selectedNationality);
        }
        else {
          this.selectedNationality = null;
          this.nationalities = null;
          this.packageService.packages.next();
          this.individualContractService.professionName.next([this.selectedProfession.value, null]);
        }
        this.packageService.filteringData.next({ nationality: this.selectedNationality, profession: this.selectedProfession });
      });
  }
  onChangeNationality(nationality: NationalityWithEmpAvailableNumber) {
    if (this.selectedProfession) {
      this.loadPackages('' + this.selectedProfession.key, nationality.nationalityId);
      this.packageService.filteringData.next({ nationality: nationality, profession: this.selectedProfession });
    }
  }
  filterPackages() {
    let profession = this.filterForm.value.profession;
    let nationality = this.filterForm.value.nationality;

    if (!nationality || !profession)
      return;

  }

  loadPackages(professionId: string, nationalityId: string) {
    this.packageService.loadPackages(professionId, nationalityId).subscribe(
      data => { });
  }

  // setProfessionAndNationality(){
  //   this.individualContractService.setProfessionAndNationality(this.selectedProfession,this.selectedNationality);
  // }
}
