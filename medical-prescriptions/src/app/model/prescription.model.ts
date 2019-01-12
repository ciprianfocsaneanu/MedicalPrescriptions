import * as moment from 'moment';

export interface IPrescription {
    creationDate: string;
    medicineList: IMedicationWithQuantity[];

    id?: number;
    description?: string;
    medic?: string;
}

export interface IMedicationWithQuantity {
    medicine: IMedication;
    quantity: number;
}

export interface IMedication {
    name: string;
    activeSubstance: string;
    activeQuantity: number;
    productionDate: any;
    expiryDate: any;
    details: string;
}

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss';

export class Prescription {
    private m_creationDate: string;
    private m_id: number;
    private m_medicineList: IMedicationWithQuantity[];
    private m_description: string;
    private m_medic: string;

    constructor(prescriptionData?: IPrescription) {
        this.m_id = prescriptionData ? prescriptionData.id : null;
        this.m_medicineList = prescriptionData ? prescriptionData.medicineList: [];
        this.m_description = prescriptionData ? prescriptionData.description: '';
        this.m_medic = prescriptionData ? prescriptionData.medic: '';
        this.m_creationDate = prescriptionData ? moment(prescriptionData.creationDate, dateFormat).format('DD/MM/YYYY') : null;
    }

    public get date(): string {
        return this.m_creationDate ? this.m_creationDate : '-';
    }
    public set date(value: string) {
        if (value) {
            this.m_creationDate = moment(value, dateFormat).format('DD/MM/YYYY');
        }
    }
    public get id(): number {
        return this.m_id ? this.m_id : 0;
    }
    public get diagnosis(): string {
        return this.m_description? this.m_description : '-';
    }
    public set diagnosis(value: string) {
        if (value) {
            this.m_description = value;
        }
    }
    public get medicineList(): IMedicationWithQuantity[] {
        return this.m_medicineList? this.m_medicineList : [];
    }
    public get medicationsNo(): number {
        return this.medicineList.length;
    }
    public get medic(): string {
        return this.m_medic? this.m_medic : '-';
    }
    public set medic(value: string) {
        if (value) {
            this.m_medic = value;
        }
    }
}