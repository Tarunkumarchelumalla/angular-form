import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { customvalidators } from './heroform2';
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
      valwithpara: 'custom parameter validation error',
    },
    number: {
      required: 'number is required',
      emailDomain: 'verifies that email sedlife.com',
    },
    Skillname: {
      required: 'skill name is required',
    },
    Skillname2: {
      required: 'skill name2 is required',
    },
    Skills: {
      skillmismatch: 'skill is not matching',
    },
    Rating: {
      required: 'rating cant be empty',
    },
  };
  formError = {
    Name: '',
    number: ' ',
    Skillname: ' ',
    Skillname2: '',
    Skills: '',
    Rating: ' ',
  };
  ngOnInit(): void {
    this.Employee = new FormGroup({
      Name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
        customValidatorwithpara('Nope'),
      ]),
      number: new FormControl(null, [Validators.required, customValidator]),
      Skills: new FormArray([this.addSkillFormgroup()]),
    });
    // this.Employee.get('Name').valueChanges.subscribe((val) => {
    //   // this.length = val.length;
    // });
    this.Employee.valueChanges.subscribe((val) => {
      this.logerror(this.Employee);
      console.log(this.formError);
    });
  }
  addSkillFormgroup(): FormGroup {
    return new FormGroup(
      {
        Skillname: new FormControl(null, [Validators.required]),
        Skillname2: new FormControl(null, [Validators.required]),
        Rating: new FormControl('Beginner', [Validators.required]),
      },
      [matchskill]
    );
  }
  delete(val): void {
    (<FormArray>this.Employee.get('Skills')).removeAt(val);
  }
  AddSkill(): void {
    (<FormArray>this.Employee.get('Skills')).push(this.addSkillFormgroup());
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

  // **************************errror **********************88

  logerror(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstract = group.get(key);
      this.formError[key] = '';
      if (abstract && !abstract.valid && (abstract.touched || abstract.dirty)) {
        const msg = this.validationMsg[key];
        // console.log(msg);
        // console.log(abstract.errors);
        for (const i in abstract.errors) {
          if (i) {
            this.formError[key] += msg[i] + ' ';
          }
        }
      }
      if (abstract instanceof FormGroup) {
        this.logerror(abstract);
      }
      if (abstract instanceof FormArray) {
        for (const jam of abstract.controls) {
          if (jam instanceof FormGroup) {
            this.logerror(jam);
          }
        }
      }
    });
  }

  onclick(): void {
    this.logerror(this.Employee);
    console.log(this.formError);
    // customvalidators.onclickform(this.Employee);
  }
}

// ************************validation*************

// custom validattors function without the parameter
function customValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const email: string = control.value;

  if (email === '' || email === 'sagelife.com') {
    return null;
  } else {
    return { emailDomain: true };
  }
}

// custom validator with parameter returns the validators funtion as a return type
function customValidatorwithpara(customval: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const val: string = control.value;

    if (val === '' || val === customval) {
      return null;
    } else {
      return { valwithpara: true };
    }
  };
}
// custom validators for two values
function matchskill(group: AbstractControl): { [key: string]: any } | null {
  const val = group.get('Skillname').value;
  const val2 = group.get('Skillname2').value;

  if (val === val2 || val === '' || val2 === '') {
    return null;
  } else {
    return { skillmismatch: true };
  }
}
