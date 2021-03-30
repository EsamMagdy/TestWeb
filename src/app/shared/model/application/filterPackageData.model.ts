import { KeyValuePairs } from "../keyValuePairs.model";
import { NationalityWithEmpAvailableNumber } from "../nationalityWithEmpAvailableNumber.model";

export interface FilterPackageData {
    profession: KeyValuePairs;
    nationality: NationalityWithEmpAvailableNumber;
}
