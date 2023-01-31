import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  public Employee: FormGroup;
  validationMsg = {
    Name: {
      required: 'Name required',
      minlength: 'Name must be greater than 2',
      maxlength: 'Name must be less than 10 ',
    },
    number: {
      required: 'number is required',
      emailDomain: 'verifies that email',
    },
    Skillname: {
      required: 'skill name is required',
    },
    Rating: {
      required: 'rating cant be empty',
    },
  };
  formError = {
    Name: '',
    number: ' ',
    Skillname: ' ',
    Rating: ' ',
  };
  ngOnInit(): void {
    this.Employee = new FormGroup({
      Name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
      number: new FormControl(null, [Validators.required]),
      Skills: new FormGroup({
        Skillname: new FormControl(null, [Validators.required]),
        Rating: new FormControl('Beginner', [Validators.required]),
      }),
    });
    // this.Employee.get('Name').valueChanges.subscribe((val) => {
    //   // this.length = val.length;
    // });
    this.Employee.valueChanges.subscribe((val) => {
      this.logerror(this.Employee);
      // console.log(this.formError);
    });
  }
  // this is importatnt loopoing through the all the form controls
  logkey(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractcontrol = group.get(key);
      if (abstractcontrol instanceof FormGroup) {
        this.logkey(abstractcontrol);
        abstractcontrol.disable();
      } else {
        console.log('Key =' + key + 'Value =' + abstractcontrol.value);
      }
    });
  }
  logerror(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstract = group.get(key);
      if (abstract instanceof FormGroup) {
        this.logerror(abstract);
      } else {
        this.formError[key] = '';
        if (abstract && !abstract.valid) {
          const msg = this.validationMsg[key];
          // console.log(msg);
          // console.log(abstract.errors);
          for (const i in abstract.errors) {
            if (i) {
              this.formError[key] += msg[i] + ' ';
            }
          }
        }
      }
    });
  }
  onclick(): void {
    this.logerror(this.Employee);
    console.log(this.formError);
  }
}
function customValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (domain.toLowerCase() === 'sedlife.com') {
    return null;
  } else {
    return { emailDomain: true };
  }
}
