import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Option, tipoPregunta } from "./survey.model";

export interface Answer {
    id : number,
    idSurvey : number,
    idPerson : number,
    answerSections : AnswerSection[]
}
export interface AnswerForm{
    id : FormControl<number>,
    idSurvey : FormControl<number>
    idPerson : FormControl<number>,
    answerSections : FormArray<any>,
}



export interface AnswerSection {
    id : number | null,
    idSection : number ,
    answerQuestions : AnswerQuestion[],
}
export interface AnswerSectionForm{
    id : FormControl<number | null>,
    idSection : FormControl<number>
    answerQuestions : FormArray<FormGroup<AnswerQuestionForm>>,
}


export interface AnswerQuestion{
    id : number,
    questionType : tipoPregunta,
    response : string | null,
    check : Option[] ,
    idQuestion : number
}
export interface AnswerQuestionForm{
    id : FormControl<number | null>,
    response : FormControl<string | null>
    idQuestion : FormControl<number >,
    check : FormControl<any> ,
    questionType : FormControl<tipoPregunta>,
}

