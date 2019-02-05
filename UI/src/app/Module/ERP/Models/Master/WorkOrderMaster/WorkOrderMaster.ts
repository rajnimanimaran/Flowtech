export class WorkOrderMaster
{
WOID : number;
WONumber : number;
OrderID : number;
SubContID : number;
Name : string;
AssignedDate : Date;
Status : boolean;
ExpectedCompleteDate : Date;
IsActive : boolean;
}
export class SubContract{
    SubContID: number;
    Name: string;
}