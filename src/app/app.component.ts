import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreateCertificadosComponent } from './feature/generate-certificate/create-certificados/create-certificados.component';
import { FindCertificateComponent } from './feature/find-certificate/find-certificate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CreateCertificadosComponent,
    FindCertificateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gerador-certificado-front';
}
