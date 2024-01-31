import { Injectable } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as CryptoJS from 'crypto-js';
import saveAs from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getDateFormatString(): string {
    return 'DD/MM/YYYY';
  }

  formatarData(data: any) {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;
    return formatted;
  }

  formatarDataToSQL(data: any) {
    return moment(data).format('L');
  }

  generateSHA256Hash(): string {
    const randomWord = this.generateRandomWord();
    return CryptoJS.SHA256(randomWord).toString(CryptoJS.enc.Hex);
  }

  private generateRandomWord(): string {
    const randomWordLength = 10;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomWord = '';
    for (let i = 0; i < randomWordLength; i++) {
      randomWord += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomWord;
  }

  saveArquivo(data: Blob) {
    const contentDispositionHeader: string | null = 'file';
    let hash = this.generateSHA256Hash();
    const filenameRegex: RegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches: RegExpMatchArray | null = contentDispositionHeader
      ? contentDispositionHeader.match(filenameRegex)
      : null;
    const filename: string =
      matches && matches.length > 1 ? matches[1] : `${hash}.rar`;

    saveAs(data, filename);
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
