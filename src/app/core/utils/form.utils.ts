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

export function moveRowFormArray(formArray : FormArray , currentIndex : number , nextIndex : number){
  if (formArray.length <= nextIndex){
      throw("NextIndex is greater that size formArray ")
  }
  if ( currentIndex === nextIndex ){
    return
  }
  const group =  formArray.at(currentIndex);
  formArray.removeAt(currentIndex);
  formArray.insert(nextIndex , group);
}
