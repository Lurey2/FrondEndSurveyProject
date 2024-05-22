export interface SurveyAnswerDTO {
  idSurvey: number
  documentName: string
  creation: Date
  modify: Date
  countComplete: number
  showPublic: boolean
  sharedCode : string,
  previeImageURL : string
}
