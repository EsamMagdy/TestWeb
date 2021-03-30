import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { ContactPreviousLocation } from 'src/app/shared/model/contactPreviousLocation.model';
import { IndividualContractService } from 'src/app/shared/service/individualContractReq.service';
import { LocationService } from '../location.service';
import { MapperFactory } from '@dboneslabs/mpr/mapper-factory';
import { MapSetup } from 'src/app/shared/model/mapSetup.model';
import { Mapper } from '@dboneslabs/mpr/mapper';
import { IndividualContractReq } from 'src/app/shared/model/individualContractReq.model';

@Component({
  selector: 'app-saved-locations',
  templateUrl: './saved-locations.component.html',
  styleUrls: ['./saved-locations.component.less'],
})
export class SavedLocationsComponent implements OnInit {
  @Input('savedLocation') prevLocation: ContactPreviousLocation[];
  activeLocation = false;
  showNewAddressButton = false;
  clickDeleted = false;
  mapperFactory: MapperFactory;
  mapper: Mapper;
  locationSelected: ContactPreviousLocation;
  constructor(
    private locationService: LocationService,
    private individualContractService: IndividualContractService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.locationService
      .getContactSavedAddressForIndiv()
      .subscribe((resData) => {
        this.prevLocation = resData;
        this.prevLocation.forEach((x) => (x.isSelected = false));
      });
  }
  onSelectLocation(location: ContactPreviousLocation) {
    if (this.clickDeleted) {
      this.clickDeleted = false;
      return;
    }
    this.prevLocation.forEach((x) => {
      if (x.contactPreviouslocationId != location.contactPreviouslocationId)
        x.isSelected = false;
    });
    location.isSelected = !location.isSelected;
    this.showNewAddressButton = location.isSelected ? true : false;
    this.locationSelected = location;
  }
  onNewAddressButtonClick() {
    this.locationService.showNewAddress.next(true);
  }
  packagePage() {
    this.setSelectedLocation();
    this.router.navigate(['/packages'], {
      queryParams: {
        stepId: this.individualContractService.individualContractReq.stepId,
      },
    });
  }
  deleteLocation(location: ContactPreviousLocation) {
    this.clickDeleted = true;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.locationService
          .deleteSavedAddress(location.contactPreviouslocationId)
          .subscribe((data) => {
            if (data) {
              this.prevLocation.forEach((item) => {
                if (
                  item.contactPreviouslocationId ===
                  location.contactPreviouslocationId
                ) {
                  let index = this.prevLocation.indexOf(item);
                  if (index !== -1) this.prevLocation.splice(index, 1);
                }
                if (this.prevLocation.length === 0)
                  this.locationService.showNewAddress.next(true);
              });
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Record deleted',
              });
            }
          });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
  private setSelectedLocation() {
    this.individualContractService.setLoactionData(this.locationSelected);

    // this.individualContractService.individualContractReq.longitude = this.locationSelected.longitude;
    // this.individualContractService.individualContractReq.latitude = this.locationSelected.latitude;
    // this.individualContractService.individualContractReq.locationFormData = {
    //   ...this.locationSelected,
    // };
    // this.individualContractService.individualContractReq.selectedLocationId = this.locationSelected.contactPreviouslocationId;
    // this.individualContractService.individualContractReq.houseNo = this.locationSelected.houseNumber;
    // this.individualContractService.individualContractReq.houseType = this.locationSelected.houseType.key;
    // this.individualContractService.individualContractReq.floorNo = this.locationSelected.floorNumber.key;
    // this.individualContractService.individualContractReq.cityId = this.locationSelected.city.cityId;
    // this.individualContractService.individualContractReq.districtId = this.locationSelected.district.districtId;
    // this.individualContractService.individualContractReq.address = this.locationSelected.addressNotes;
    // this.individualContractService.individualContractReq.partmentNumber = this
    //   .locationSelected.apartmentNumber
    //   ? this.locationSelected.apartmentNumber
    //   : null;
  }
}
