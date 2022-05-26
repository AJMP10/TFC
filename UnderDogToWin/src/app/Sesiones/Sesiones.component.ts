import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-Sesiones',
  templateUrl: './Sesiones.component.html',
  styleUrls: ['./Sesiones.component.scss']
})
export class SesionesComponent implements OnInit {

  createImage;
  create = false;
  ocultar = false;
  name: string;
  description: string;
  dimensions: string;
  objectives: string;
  duration: string;

  isEnable: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  createPicture() {
    if (this.isEnable === true) {
      html2canvas(document.querySelector("#divPDF")).then(canvas => {

        this.createImage = canvas.toDataURL();

      });
      this.create = true;
      this.isEnable = false;
      return this.createImage;
    }
  }

  resetImage(){
    this.create=false;
    this.isEnable=true;
    this.createPicture();
  }

  createPDF() {
    const pdfDefinition: any = {
      content: [
        {
          columns: [
            {
              text: 'Ejercicio',
              style: 'title'
            }
          ],
        },
        {
          columns: [
            {
              image: this.createImage,
              width: 500,
              height: 300
            }
          ],
        },
        {
          columns: [
            {
              text: 'Nombre',
              style: 'header'
            },
            {
              text: 'Duración',
              style: 'header'
            }
          ],
        },
        {
          columns: [
            {
              text: this.name,
              style: 'subheader'
            },
            {
              text: this.duration,
              style: 'subheader'
            }
          ],
        },
        {
          columns: [
            {
              text: 'Objetivos',
              style: 'header'
            },
            {
              text: 'Dimensiones',
              style: 'header'
            }
          ],
        },
        {
          columns: [
            {
              text: this.objectives,
              style: 'subheader'
            },
            {
              text: this.dimensions,
              style: 'subheader'
            }
          ],
        },
        {
          columns: [
            {
              text: 'Desripción',
              style: 'header'
            }
          ],
        },
        {
          columns: [
            {
              text: this.description,
              style: 'subheader'
            }
          ],
        },
      ],
      styles: {
        title: {
          fontSize: 20,
          bold: true,
          color: '#FF0000',
          alignment: 'center'

        },
        header: {
          fontSize: 20,
          bold: true,
          color: '#FF0000',
          margin: [0, 40, 0, 30],
          alignment: 'center'
        },
        subheader: {
          fontSize: 15,
          alignment: 'center',
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }

}
