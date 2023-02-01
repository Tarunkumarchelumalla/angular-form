import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';

export class customvalidators {
  static onclickform(group:AbstractControl): void {
    const formArray = new FormArray([
      group,
      new FormControl('helo', Validators.required),
      new FormControl('hampuuu', Validators.required),
    ]);
    console.log(formArray.value);
  }
}
