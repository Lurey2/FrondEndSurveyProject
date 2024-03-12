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

export interface SectionResponse {
id: number;
orden: number;
titulo: string;
descripcion: string;
preguntas: QuestionResponse[];
idEstado: number;
}
  
  

export interface QuestionResponse {
id: number;
orden: number;
titulo: string;
descripcion: string;
idSeccion: number;
esRequerida: boolean;
opciones: OptionResponse[];
tipo: tipoPregunta;
idEstado: number;
esImagen: boolean;
}

  
export interface OptionResponse {
id: number;
orden: number;
descripcion: string;
estaActivo: boolean;
esOtros: boolean;
otraDescripcion: string | null;
}
  
