import * as moment from 'moment';

export interface IPrescription {
    timestamp: string;
    medications: IMedication[];

    id?: number;
    diagnosis?: string;
    medic?: string;
}

export interface IMedication {
    name: string;
}

export class Prescription {
    private m_date: string;
    private m_id: number;
    private m_medications: IMedication[];
    private m_diagnosis: string;
    private m_medic: string;

    constructor(prescriptionData?: IPrescription) {
        this.m_id = prescriptionData ? prescriptionData.id : null;
        this.m_medications = prescriptionData ? prescriptionData.medications: [];
        this.m_diagnosis = prescriptionData ? prescriptionData.diagnosis: '';
        this.m_medic = prescriptionData ? prescriptionData.medic: '';
        this.m_date = prescriptionData ? moment(prescriptionData.timestamp, 'DD/MM/YYYY').format('DD/MM/YYYY') : null;
    }

    public get date(): string {
        return this.m_date ? this.m_date : '-';
    }
    public set date(value: string) {
        if (value) {
            this.m_date = moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY');
        }
    }
    public get id(): number {
        return this.m_id ? this.m_id : 0;
    }
    public get diagnosis(): string {
        return this.m_diagnosis? this.m_diagnosis : '-';
    }
    public set diagnosis(value: string) {
        if (value) {
            this.m_diagnosis = value;
        }
    }
    public get medications(): IMedication[] {
        return this.m_medications? this.m_medications : [];
    }
    public get medicationsNo(): number {
        return this.medications.length;
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