import { IMedication } from './prescription.model';

export interface IPharmacy {
    name: string;
    address: string;
    openAt: number;
    closeAt: number;
    medicineList: IMedication[];

    latitude?: string;
    longitude?: string;
}