import { Routes } from '@angular/router';
import { CreateCertificadosComponent } from './feature/generate-certificate/create-certificados/create-certificados.component';
import { HomeComponent } from './feature/home/home.component';
import { FindCertificateComponent } from './feature/find-certificate/find-certificate.component';

export const routes: Routes = [
  {
    path: 'generate',
    children: [
      {
        path: '',
        component: CreateCertificadosComponent,
      },
    ],
  },
  {
    path: 'find',
    children: [
      {
        path: '',
        component: FindCertificateComponent,
      },
    ],
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
