export interface Pricing {
    id: string,
    name: string
    priceType: string
    priceTypeName: string
    contractMonths: string
    periodAmount: string
    everyMonth: string
    monthlyPaid: string
    prePaid: string
    amountInsurance: string
    nonSaudiInsurance: string
    contractAmount: string
    renewalAmount: string
    discount: string
    sanadAmount: string
    discountName: string
    discountPercentage: string
    vatamount: string
    contractpricewithoutvat: string
    amountafterdiscount: string
    periodinDaiys: string
    orderPackage: string
    vatRate: string
    professionForGender: string
    stateCode: string
    finalPrice: string
    priceWithDiscount: string
    renewDiscount: string
    activationAmount: string
    availableForNew: string
    availableForRenew: string
    displayFor: DisplayPricingFor
}
export enum DisplayPricingFor {
    Web = 1,
    Mobile = 2,
    WebAndMobile = 3,
    CRMNewPortal = 4,
    All = 5
}