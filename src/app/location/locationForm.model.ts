import { City } from "../shared/model/city.model";
import { District } from "../shared/model/district.model";
import { KeyValuePairs } from "../shared/model/keyValuePairs.model";

export interface LocationFormData {
    addressNotes: string;
    houseNumber: string;
    apartmentNumber: string;
    city: City;
    district: District;
    floorNumber: KeyValuePairs;
    houseType: KeyValuePairs;
}