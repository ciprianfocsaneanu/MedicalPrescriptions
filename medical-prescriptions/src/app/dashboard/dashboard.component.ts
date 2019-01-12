import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestAccessService } from '../core/rest-access.service';
import { Prescription } from '../model/prescription.model';
import { IPharmacy } from '../model/pharmacy.model';

declare var ol: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private m_prescriptions: Prescription[] = null;
  private map: any;
  private m_longitude: number = 44.435544; // hardcoded UPB location
  private m_latitude: number = 26.051683;

  public searchedMedication: string = null;
  public medicationLoading = false;
  public pharmacies: IPharmacy[] = null;

  constructor(private m_restAccessService: RestAccessService, private m_router: Router) {
    this.m_restAccessService.getAllPrescriptions().subscribe(prescriptions => {
      if (prescriptions) {
        this.m_prescriptions = prescriptions.map(prescription => new Prescription(prescription));
      }
    });
  }

  ngOnInit() {
    this.setupMap();
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
  public searchMedication(): void {
    if (this.searchedMedication) {
      this.medicationLoading = true;
      const medicine: any = {
        name: this.searchedMedication
      };
      this.m_restAccessService.findPharmacies([medicine]).subscribe(pharmacies => {
        this.medicationLoading = false;
        if (pharmacies) {
          this.pharmacies = pharmacies;
        }
      });
    }
  }

  // Private methods
  private setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.m_latitude, this.m_longitude]));
    view.setZoom(13);
  }
  private setupMap(): void { 
    const baseMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    this.map = new ol.Map({
      target: 'dashboard-map',
      layers: [baseMapLayer]
    });
    this.setCenter();
  }
  private addMarker(latitude: number, longitude: number, name: string): void {
    const style = new ol.style.Style({
      text: new ol.style.Text({
        font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
        placement: 'line',
        fill: new ol.style.Fill({
          color: 'white'
        })
      })
    });

    const marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([latitude,longitude])
      ),
      label: name
    });
    const vectorSource = new ol.source.Vector({
      features: [marker]
    });
    const markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
      // TODO: Show label
      // style: style
      // style: function(feature) {
      //   console.log('Check you get the property', feature.get('label'));
      //   console.log(style.getText());
      //   style.getText().setText(feature.get('label'));
      //   console.log(style.getText());
      //   return style;
      // }
    });
    this.map.addLayer(markerVectorLayer);
  }
}
