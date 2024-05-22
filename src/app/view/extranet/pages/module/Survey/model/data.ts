import { Question, Survey } from "./survey.model";

export const DATAINITAL : Survey = {
    id : 0,
    previeImageURL : 'assets/jpg/default.jpg',
    requiredLogged : false,
    score : false,
    showPublic : false,
    showEdit: false,
    repeatForm : true,
    sharedUsers : [],
    sections : [
        {
            id: null,
            title : 'TITULO DE LA SECCION INICIAL',
            description: 'Descripción de la sección',
            order : 0,
            questions :  [
                {
                    id :null,
                    description : null,
                    title : 'Escriba su pregunta',
                    required : true,
                    order: 0,
                    questionType : 'respuestaCorta',
                    options : []
                }
            ]
        }
    ]
};
