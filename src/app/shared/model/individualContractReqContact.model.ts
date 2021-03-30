import { ContactPreviousLocation } from "./contactPreviousLocation.model";

export interface IndvReqContact {
    ContactId: string;
    FirstName: string;
    LastName: string;
    FullName: string;
    MobilePhone: string;
    OtherMobilePhone: string;
    Address: string;
    Email: string;
    JobTitle: string;
    WorkSector: number
    WorkAddress: string;
    WorkPlace: string;
    IdentificationNo: string;
    CityId: string;
    NationalityId: string;
    Gender: number;
    CompanyKnownBy: number;
    CityName: string;
    NationalityName: string;
    Address1_PostalCode: string;
    PreviousLocation:ContactPreviousLocation[]
    ResponsibleEmployee: string;
    BlackList: boolean;
}