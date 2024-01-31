import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import moment from 'moment';
import 'moment/locale/pt-br';
import { SharedModule } from '../../../modules/shared.module';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { MY_FORMATS, UtilsService } from '../../../utils/utils.service';
import { CertificadoDTO } from '../../../interfaces/dtos/CertificadoDTO';
import { CertificadoService } from '../../../services/certificado.service';
import { LoadingService } from '../../../utils/loading.service';
import { NotifierService } from '../../../utils/notifier.service';
import { CertificadoInput } from '../../../interfaces/input/CertificadoInput';

moment.locale('pt-BR');

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-create-certificados',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    SharedModule,
    SpinnerComponent,
  ],
  templateUrl: './create-certificados.component.html',
  styleUrl: './create-certificados.component.css',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateCertificadosComponent implements OnInit {
  certificadoForm!: FormGroup;
  certificadoDTO!: CertificadoDTO;
  fileName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private certificadoService: CertificadoService,
    private toastr: NotifierService,
    private loadService: LoadingService
  ) {}

  ngOnInit(): void {
    this.createTable();
  }

  createTable() {
    this.certificadoForm = this.formBuilder.group({
      dataInicio: [''],
      dataFim: [''],
      qtdHoras: [''],
      nomeCurso: ['', Validators.required],
      urlDados: ['', Validators.required],
      urlImg: ['', Validators.required],
      urlVerso: [null],
    });
  }

  onFileSelected(event: any, field: string) {
    const selectedFile: File = <File>event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      this.certificadoForm.get(`${field}`)?.setValue(formData.get('file'));
    }
  }

  save() {
    if (this.certificadoForm) {
      this.certificadoDTO = {
        dataInicio: this.certificadoForm.get('dataInicio')?.value,
        // dataFim: this.certificadoForm.get('dataFim')?.value,
        qtdHoras: this.certificadoForm.get('qtdHoras')?.value,
        nomeCurso: this.certificadoForm.get('nomeCurso')?.value,
        urlDados: this.certificadoForm.get('urlDados')?.value,
        urlImg: this.certificadoForm.get('urlImg')?.value,
        urlVerso: this.certificadoForm.get('urlVerso')?.value,
      };

      this.certificadoDTO.dataInicio = this.utils.formatarDataToSQL(
        this.certificadoDTO.dataInicio
      );

      let certificadoInput = new CertificadoInput(this.certificadoDTO);

      this.loadService.show();
      this.certificadoService.create(certificadoInput).subscribe(
        (data) => {
          this.utils.saveArquivo(data);
          this.toastr.ShowSuccess('Certificados gerados com sucesso');
          this.loadService.hide();
        },
        (error) => {
          this.toastr.ShowError(error);
        }
      );
    } else {
      console.log('Formulário inválido!');
    }
  }

  getErrorMessage() {
    if (this.certificadoForm.get('dataInicio')?.errors) {
      return 'You must enter a value';
    }
    if (this.certificadoForm.get('dataFim')?.errors) {
      return 'You must enter a value';
    }
    if (this.certificadoForm.get('qtdHoras')?.errors) {
      return 'You must enter a value';
    }
    if (this.certificadoForm.get('nomeCurso')?.errors) {
      return 'You must enter a value';
    }
    if (this.certificadoForm.get('urlDados')?.errors) {
      return 'You must enter a value';
    }
    if (this.certificadoForm.get('urlImg')?.errors) {
      return 'You must enter a value';
    }
    if (this.certificadoForm.get('urlVerso')?.errors) {
      return 'You must enter a value';
    }
    return;
  }

  getDateFormatString() {
    return this.utils.getDateFormatString();
  }
}
