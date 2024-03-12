import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type tipoPregunta =
  | 'respuestaCorta'
  | 'parrafo'
  | 'seleccion'
  | 'seleccionMultiple'
  | 'combobox'
  | 'archivo'
  | 'escala'
  | 'matriz'
  | 'fecha'
  | 'hora';

export interface Survey {
  id: number ;
  sections: Section[];
  previeImageURL: string;
  requiredLogged : boolean ;
  score : boolean;
  showPublic : boolean;
  showEdit : boolean;
  sharedUsers  :  any[];
  title: string;
  sharedCode? : string ;
  sharedEdit? : string;
}

export interface SurveyForm {
  id:  FormControl<any> ;
  previeImageURL: FormControl<string>;
  title: FormControl<string | null>;
  sections: FormArray<any>; // sections Form
  requiredLogged : FormControl<boolean>;
  score : FormControl<boolean>;
  showPublic : FormControl<boolean>;
  showEdit : FormControl<boolean>;
  sharedUsers : FormControl<any>;
}

export interface Section {
  id: number  | null ;
  title: string;
  description: string | null;
  order: number;
  questions: Question[];
}


export interface SectionForm {
  id:  FormControl<number | null> ;
  title: FormControl<string>;
  description: FormControl<string | null>;
  order: FormControl<number>;
  questions: FormArray<any>;
}

export interface Question {
  id: number| null;
  title: string;
  description: string | null;
  required: boolean;
  questionType: tipoPregunta;
  order: number;
  options: Option[];
}

export interface QuestionForm {
  id : FormControl<number| null> ;
  title : FormControl<string> ;
  description : FormControl<string | null> ;
  required : FormControl<boolean>;
  questionType : FormControl<tipoPregunta>;
  order :FormControl<number>;
  options:FormArray<any>;
}


export interface Option {
  id: number| null;
  description: string;
  correct: boolean;
  order: number;
}

export interface OptionForm {
  id : FormControl<number | null> ;
  description  : FormControl<string> ;
  correct : FormControl<boolean> ;
  order : FormControl<number> ;
}

