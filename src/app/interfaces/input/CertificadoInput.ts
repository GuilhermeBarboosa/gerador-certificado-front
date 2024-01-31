import { CertificadoDTO } from '../dtos/CertificadoDTO';
import { DefaultDto } from '../dtos/DefaultDTO';

export class CertificadoInput {
  dataInicio: string = '';
  qtdHoras: string = '';
  nomeCurso: string = '';
  urlDados: File = new File([], '');
  urlImg: File = new File([], '');
  urlVerso: File = new File([], '');

  constructor(certificado: CertificadoDTO) {
    this.dataInicio = certificado.dataInicio;
    this.qtdHoras = certificado.qtdHoras;
    this.nomeCurso = certificado.nomeCurso;

    if (certificado.urlDados !== null && certificado.urlDados !== undefined) {
      this.urlDados = certificado.urlDados as File;
    }

    if (certificado.urlImg !== null && certificado.urlImg !== undefined) {
      this.urlImg = certificado.urlImg as File;
    }

    if (certificado.urlVerso !== null && certificado.urlVerso !== undefined) {
      this.urlVerso = certificado.urlVerso as File;
    }
  }
}
