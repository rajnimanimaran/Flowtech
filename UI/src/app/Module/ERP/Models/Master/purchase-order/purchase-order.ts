export class PurchaseOrder {
    PurchaseID: number;
    ID: number;
    Code: string;
    SID: number;
    SupplierID: number;
    SName:string;
    PurchaseDate: Date;
    ExpectDeliveryDate: Date;
    OrderDetails: string;
}
export class GetID{
    PurchaseID: number;
    ID: number;
}
// export class PurchaseOrderDetails {
//     RawMaterialID: number;
//     Quantity: string;
//     UOM: number;
//     GSTNo: number;
//     Rate: number;
//     Tax:number;
//     Amount: number;
//     TotalAmount: number
// }

export class getSupplierName{
    SID : number;
    SName:string;
}


export class supplier{
    SName:string;
    Address:string;
    GSTNo:string;
    ContactNo:string;
}