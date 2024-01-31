import { Component, OnInit } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { CertificadoService } from '../../services/certificado.service';
import { UtilsService } from '../../utils/utils.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private certificadoService: CertificadoService,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  getAll() {
    this.certificadoService.getAll().subscribe((data) => {
      this.utils.saveArquivo(data);
    });
  }
}
