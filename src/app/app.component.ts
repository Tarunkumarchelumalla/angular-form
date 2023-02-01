import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppServiceService, emp } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public emps: emp[] = [];
  constructor(private _ed: AppServiceService) {
    _ed.getConfig().subscribe((val) => {
      const emp: emp = {
        Name: val['first_name'],
        email: val['email'],
      };
      this.emps.push(emp);
      console.log(val);
      console.log(this.emps);
    });

  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
