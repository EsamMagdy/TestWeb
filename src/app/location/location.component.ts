import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactPreviousLocation } from '../shared/model/contactPreviousLocation.model';
import { KeyValuePairs } from '../shared/model/keyValuePairs.model';
import { IndividualContractService } from '../shared/service/individualContractReq.service';
import { City } from './city.model';
import { District } from './district.model';
import { LocationService } from './location.service';
import { LocationFormData } from './locationForm.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  @ViewChild('locationForm') locationForm: NgForm;
  showNewAddress: boolean = false;
  prevLocation: ContactPreviousLocation[] = [];

  constructor(private cityService: LocationService) {}

  ngOnInit(): void {
    this.cityService.showNewAddress.subscribe(
      (showAddress) => (this.showNewAddress = showAddress)
    );
    this.cityService.getContactSavedAddressForIndiv().subscribe((resData) => {
      this.prevLocation = resData;
      if (!this.prevLocation || this.prevLocation.length === 0)
        this.showNewAddress = true;
    });
  }
}
