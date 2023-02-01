import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {HeroFormComponent} from './hero-form.component';

export class customvalidators {
  static addSkillFormgroup():FormGroup{
    return new FormGroup(
        {
          Skillname: new FormControl(null, [Validators.required]),
          Skillname2: new FormControl(null, [Validators.required]),
          Rating: new FormControl('Beginner', [Validators.required]),
        },
    )
  }
  static onclickform(group:AbstractControl): void {
    // const formArray = new FormArray([
    //   group,
    //   new FormControl('helo', Validators.required),
    //   new FormControl('hampuuu', Validators.required),
    // ]);
    // console.log(formArray.value);


  }
}
