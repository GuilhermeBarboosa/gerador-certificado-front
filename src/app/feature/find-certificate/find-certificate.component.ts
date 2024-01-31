import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CertificadoService } from '../../services/certificado.service';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-find-certificate',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './find-certificate.component.html',
  styleUrl: './find-certificate.component.css',
})
export class FindCertificateComponent implements OnInit {
  findForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private certificadoService: CertificadoService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.findForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.min(3)]],
    });
  }

  findByCpf() {
    let cpf = this.findForm.get('cpf')?.value;
    this.certificadoService.findByCpf(cpf).subscribe((data) => {
      this.utils.saveArquivo(data);
    });
  }
}
