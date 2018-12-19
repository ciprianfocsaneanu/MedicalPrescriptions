import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  constructor(private m_activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.m_activatedRoute.queryParams.subscribe(queryParams => {
      // TODO: Get prescription id and get data
    });
  }

}
