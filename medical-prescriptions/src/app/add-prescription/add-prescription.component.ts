import { Component, OnInit } from '@angular/core';
import { Prescription, IPrescription } from '../model/prescription.model';
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

  public addNewPrescription(medicationsString: string): void {
    console.log(medicationsString);
    const newPrescription: IPrescription = {
      medic: this.medic,
      diagnosis: this.diagnosis,
      timestamp: this.date.format('DD/MM/YYYY'),
      medications: []
    };
    this.showSpinner = true;
    this.m_restAccessService.addPrescription(newPrescription).subscribe(result => {
      this.m_router.navigate(['dashboard']);
    });
  }
}
