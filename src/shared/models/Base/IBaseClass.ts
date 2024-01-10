import { EStatus } from "./EStatus";

export interface IBaseClass {
    id: string;
    status: EStatus;
    isDeleted: boolean;
    createdOn: Date;
    updatedOn?: Date;
}