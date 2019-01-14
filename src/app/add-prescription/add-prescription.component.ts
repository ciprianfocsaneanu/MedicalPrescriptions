import { Component, OnInit } from '@angular/core';
import { Prescription, IPrescription, IMedication, dateFormat, IMedicationWithQuantity } from '../model/prescription.model';
import * as moment from 'moment';
import { RestAccessService } from '../core/rest-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {

  public showSpinner = false;

  public medic: string = null;
  public diagnosis: string = null;
  public date: moment.Moment = null;
  public medications: string = null;

  constructor(private m_restAccessService: RestAccessService, private m_router: Router) { }

  ngOnInit() {
  }

  public get addButtonEnabled(): boolean {
    return !!this.date && !!this.medic && !!this.medications;
  }

  public addNewPrescription(medicationsString: string): void {
    const newPrescription: IPrescription = {
      medic: this.medic,
      description: this.diagnosis,
      creationDate: this.date.format(dateFormat),
      medicineList: this.parseMedications()
    };
    this.showSpinner = true;
    this.m_restAccessService.addPrescription(newPrescription).subscribe(result => {
      this.m_router.navigate(['dashboard']);
    });
  }

  public medicationsValueChange(event): void {
    try {
      this.medications = event.target.value;
      console.log(this.medications);
      this.parseMedications();
    } catch(e) {
      console.error('could not set textarea-value');
    }
  }

  private parseMedications(): IMedicationWithQuantity[] {
    const medicineList: IMedicationWithQuantity[] = [];
    try {
      if (this.medications && this.medications.length > 0) {
        const rows = this.medications.split('\n');
        rows.forEach(row => {
          if (row && row.length > 0) {
            const rowSplit = row.split('-');
            if (rowSplit && rowSplit.length === 2) {
              const medicine: IMedicationWithQuantity = {
                medicine: <any>{
                  name: rowSplit[0]
                },
                quantity: Number(rowSplit[1])
              };
              medicineList.push(medicine);
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
    return medicineList.filter(medicine => medicine.quantity > 0);
  }
}
