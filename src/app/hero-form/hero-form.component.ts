import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  public Employee: FormGroup;
  public length = 0;
  ngOnInit(): void {
    this.Employee = new FormGroup({
      Name: new FormControl(),
      number: new FormControl(),
      Skills: new FormGroup({
        Skillname: new FormControl(),
        Rating: new FormControl('Beginner'),
      }),
    });
    // this.Employee.get('Name').valueChanges.subscribe((val) => {
    //   // this.length = val.length;
    // });
    this.Employee.valueChanges.subscribe((val) => {
      console.log(JSON.stringify(val));
    });
  }
}
