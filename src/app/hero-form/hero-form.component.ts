import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  public Employee: FormGroup;
  ngOnInit(): void {
    this.Employee = new FormGroup({
      Name: new FormControl(),
      number: new FormControl(),
      Skills: new FormGroup({
        Skillname: new FormControl(),
        Rating: new FormControl('Beginner'),
      }),
    });
  }
}
