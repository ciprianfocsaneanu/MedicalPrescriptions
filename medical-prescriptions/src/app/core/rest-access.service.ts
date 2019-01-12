import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPrescription, IMedication } from '../model/prescription.model';
import { AuthenticationService } from './authentication.service';
import { IPharmacy } from '../model/pharmacy.model';

const prescriptionsApiUrl = 'http://localhost:8302/prescription';
const pharmacyApiUrl = 'http://localhost:8302/inventory/pharmacy';
@Injectable()
export class RestAccessService {

  constructor(private m_httpClient: HttpClient,
    private m_authenticationService: AuthenticationService) {}

  public getAllPrescriptions(): Observable<IPrescription[]> {
    const resultSubject = new Subject<IPrescription[]>();
    this.m_httpClient.get(prescriptionsApiUrl, {
      headers: this.m_authenticationService.httpHeaders
    }).subscribe((response: IPrescription[]) => {
      resultSubject.next(response);
    }, err => {
      window.alert('API Authentication Error. Redirecting to login ...');
      this.m_authenticationService.logout();
      resultSubject.next(null);
    });
    return resultSubject;
  }

  public getPrescription(id: number): Observable<IPrescription> {
    const resultSubject = new Subject<IPrescription>();
    this.m_httpClient.get(prescriptionsApiUrl + '/' + id, {
      headers: this.m_authenticationService.httpHeaders
    }).subscribe((response: IPrescription) => {
      resultSubject.next(response);
    }, err => {
      window.alert('API Authentication Error. Redirecting to login ...');
      this.m_authenticationService.logout();
      resultSubject.next(null);
    });
    return resultSubject;
  }

  public addPrescription(prescriptionData: IPrescription): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    const body: IPrescription = {
      creationDate: prescriptionData.creationDate,
      description: prescriptionData.description,
      medicineList: prescriptionData.medicineList
    };
    this.m_httpClient.post(prescriptionsApiUrl,
      body,
      { headers: this.m_authenticationService.httpHeaders }
    ).subscribe(response => {
      resultSubject.next(!!response);
    }, err => {
      window.alert('API Authentication Error. Redirecting to login ...');
      this.m_authenticationService.logout();
      resultSubject.next(false);
    });
    return resultSubject;
  }

  public findPharmacies(medicineList: IMedication[]): Observable<IPharmacy[]> {
    const resultSubject = new Subject<IPharmacy[]>();
    this.m_httpClient.post(pharmacyApiUrl,
      medicineList,
      { headers: this.m_authenticationService.httpHeaders
    }).subscribe((response: IPharmacy[]) => {
      resultSubject.next(response);
    }, err => {
      window.alert('API Authentication Error. Redirecting to login ...');
      this.m_authenticationService.logout();
      resultSubject.next(null);
    });
    return resultSubject;
  }
}
