import { Component, OnInit } from '@angular/core';
import { Prescription, IPrescription, IMedication } from '../model/prescription.model';
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
      diagnosis: this.diagnosis,
      timestamp: this.date.format('DD/MM/YYYY'),
      medications: this.parseMedications()
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
    } catch(e) {
      console.error('could not set textarea-value');
    }
  }

  private parseMedications(): IMedication[] {
    // TODO: Parse this.medications string
    return [];
  }
}
