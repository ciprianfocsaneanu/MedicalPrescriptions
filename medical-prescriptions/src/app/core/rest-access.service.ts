import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer } from 'rxjs';
import { IPrescription } from '../model/prescription.model';

const mockPrescriptions: IPrescription[] = [
  {
    timestamp: '20/12/2018',
    id: 1,
    medications: [{ name :'Nurofen'}, { name :'Paracetamol'}, { name :'Brufen'}],
    diagnosis: 'Lorem ipsum 1',
    medic: 'Dr. Prad Bitt'
  },
  {
    timestamp: '21/12/2018',
    id: 2,
    medications: [],
    diagnosis: 'Lorem ipsum 2',
    medic: 'Dr. Bavid Deckham'
  },
  {
    timestamp: '22/12/2018',
    id: 3,
    medications: [],
    diagnosis: 'Lorem ipsum 3',
    medic: 'Dr. Sohn Jnow'
  },
];

@Injectable()
export class RestAccessService {

  constructor(private m_httpClient: HttpClient) {}

  public getAllPrescriptions(): Observable<IPrescription[]> {
    const resultSubject = new Subject<IPrescription[]>();
    timer(1000).subscribe(result => {
      resultSubject.next(mockPrescriptions);
      resultSubject.complete();
    });
    return resultSubject;
  }

  public getPrescription(id: number): Observable<IPrescription> {
    const resultSubject = new Subject<IPrescription>();
    timer(1000).subscribe(result => {
      resultSubject.next(mockPrescriptions[0]);
      resultSubject.complete();
    });
    return resultSubject;
  }

  public addPrescription(prescriptionData: IPrescription): Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    mockPrescriptions.push(prescriptionData);
    timer(1000).subscribe(result => {
      resultSubject.next(true);
      resultSubject.complete();
    });
    return resultSubject;
  }
}
