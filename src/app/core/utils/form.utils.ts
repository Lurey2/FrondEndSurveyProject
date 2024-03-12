import { FormArray, FormGroup } from "@angular/forms";

export function detectError(group : FormGroup){
    Object.values(group.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
      if (control instanceof FormArray && control.invalid){
        control.controls.forEach((controlArray) => {
          detectError(controlArray as FormGroup)
        })
      }
    });
}