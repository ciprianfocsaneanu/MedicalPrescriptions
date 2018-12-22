import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestAccessService } from '../core/rest-access.service';
import { Prescription } from '../model/prescription.model';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  private m_id: number;
  
  public prescription: Prescription;

  constructor(private m_activatedRoute: ActivatedRoute, private m_router: Router,
    private m_restAccessService: RestAccessService) { }

  ngOnInit() {
    this.m_activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams && queryParams['id']) {
        this.m_id = queryParams['id'];
        this.getPrescriptionData();
      } else {
        this.m_router.navigate(['dashboard']);
      }
    });
  }

  public get prescriptionLoaded(): boolean {
    return !!this.prescription;
  }

  private getPrescriptionData(): void {
    this.m_restAccessService.getPrescription(this.m_id).subscribe(prescription => {
      if (prescription) {
        this.prescription = new Prescription(prescription);
      }
    });
  }

}
