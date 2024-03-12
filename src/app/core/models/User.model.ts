import { FormControl } from "@angular/forms"

export interface SignUpUser{
  firstName : string
  lastName : string
  email : string
  password : string
}

export interface SignUpUserForm{
  firstName :  FormControl<string>,
  lastName : FormControl<string>,
  email : FormControl<string>,
  password : FormControl<string>,
  confirmPassword : FormControl<string>
}

export interface SignInUser{
  email : string,
  password : string
}
export interface SignInUserForm{
  email : FormControl<string>,
  password : FormControl<string>
}


export interface User {
  id: number,
  email : string,
}