import { Component, OnInit } from '@angular/core';
import { IPrescription, Prescription } from '../model/prescription.model';
import { RestAccessService } from '../core/rest-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private m_prescriptions: Prescription[] = null;

  public searchedMedication: string = null;

  constructor(private m_restAccessService: RestAccessService, private m_router: Router) {
    this.m_restAccessService.getAllPrescriptions().subscribe(prescriptions => {
      if (prescriptions) {
        this.m_prescriptions = prescriptions.map(prescription => new Prescription(prescription));
      }
    });
  }

  ngOnInit() {
  }

  public get prescriptions(): Prescription[] {
    return this.m_prescriptions ? this.m_prescriptions : [];
  }
  public get prescriptionsLoaded(): boolean {
    return !!this.m_prescriptions;
  }
  public get searchButtonEnabled(): boolean {
    return !!this.searchedMedication && this.searchedMedication.length > 0;
  }

  public prescriptionClicked(prescription: Prescription): void {
    if (prescription) {
      this.m_router.navigate(['prescription'], { queryParams: { id: prescription.id }});
    }
  }
  public navigateToAddPrescription(): void {
    this.m_router.navigate(['addPrescription']);
  }

}
