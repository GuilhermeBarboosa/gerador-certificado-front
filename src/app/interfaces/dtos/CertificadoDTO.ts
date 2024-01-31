import { DefaultDto } from './DefaultDTO';

export interface CertificadoDTO extends DefaultDto {
  dataInicio: string;
  qtdHoras: string;
  nomeCurso: string;
  urlDados: File;
  urlImg: File;
  urlVerso: File;
}
