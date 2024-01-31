import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { CertificadoInput } from '../interfaces/input/CertificadoInput';

@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlCertificado = `${environment.api}/gerar-certificado`;

  create(certificado: CertificadoInput) {

    console.log(certificado.urlDados)
    console.log(certificado.urlImg)
    console.log(certificado.urlVerso)
    const formData = new FormData();

    formData.append('urlDados', certificado.urlDados);
    formData.append('dataInicio', certificado.dataInicio);
    formData.append('urlImg', certificado.urlImg);
    formData.append('urlVerso', certificado.urlVerso);
    formData.append('qtdHoras', certificado.qtdHoras);
    formData.append('nomeCurso', certificado.nomeCurso);

    return this.http.post(`${this.urlCertificado}`, formData, {
      responseType: 'blob',
    });
  }

  findByCpf(cpf: String) {
    return this.http.post(`${this.urlCertificado}/procurar`, cpf, {
      responseType: 'blob',
    });
  }

  getAll() {
    return this.http.get(`${this.urlCertificado}/getAll`, {
      responseType: 'blob',
    });
  }
}
