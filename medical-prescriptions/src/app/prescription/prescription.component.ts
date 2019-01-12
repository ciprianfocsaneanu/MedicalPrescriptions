import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestAccessService } from '../core/rest-access.service';
import { Prescription, IMedication } from '../model/prescription.model';
import { IPharmacy } from '../model/pharmacy.model';

declare var ol: any;

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  private m_id: number;
  private m_longitude: number = 44.435544; // hardcoded UPB location
  private m_latitude: number = 26.051683;
  private m_pharmacyResults: string[] = ['Dona', 'HelpNet', 'Catena'];
  private map: any;

  public pharmaciesLoading = true;
  public prescription: Prescription;
  public pharmacies: IPharmacy[] = [];

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

  public getMedicineNamesForPharmacy(pharmacy: IPharmacy): string[] {
    const names = [];
    if (pharmacy && pharmacy.medicineList) {
        pharmacy.medicineList.forEach(medicine => {
            if (medicine && medicine.name) {
                names.push(medicine.name);
            }
        });
    }
    return names;
  }
  public getMedicineTextDisplay(pharmacy: IPharmacy): string {
    return this.getMedicineNamesForPharmacy(pharmacy).join(', ');
  }

  // Getters and setters
  public get prescriptionLoaded(): boolean {
    return !!this.prescription;
  }
  public get pharmacyResults(): string[] {
    return this.m_pharmacyResults ? this.m_pharmacyResults : [];
  }

  // Private methods
  private getPrescriptionData(): void {
    this.m_restAccessService.getPrescription(this.m_id).subscribe(prescription => {
      if (prescription) {
        this.prescription = new Prescription(prescription);
        this.searchPharmacies();
        this.setupMap();
      }
    });
  }
  private searchPharmacies(): void {
    const medicineList: IMedication[] = this.prescription.medicineList.map(entry => entry.medicine);
    this.pharmaciesLoading = true;
    this.m_restAccessService.findPharmacies(medicineList).subscribe(pharmacies => {
      this.pharmaciesLoading = false;
      if (pharmacies) {
        this.pharmacies = pharmacies;
        this.pharmacies.forEach(pharmacy => {
          if (pharmacy.latitude && pharmacy.longitude) {
            this.addMarker(pharmacy.latitude, pharmacy.longitude, pharmacy.name);
          }
        });
      }
    });
  }
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
      target: 'map',
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
