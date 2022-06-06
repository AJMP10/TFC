import { Component, OnInit } from '@angular/core';
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

  // Variables
  createImage;

  name: string;
  description: string;
  dimensions: string;
  objectives: string;
  duration: string;

  create = false;
  ocultar = false;
  isEnable: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  // Método que convierte el div en una imagen
  createPicture() {
    if (this.isEnable === true) {
      // Recogemos el contenedor que queremos convertir a imagen
      html2canvas(document.querySelector("#divPDF")).then(canvas => {
        // Convertimos el canvas a imagen
        this.createImage = canvas.toDataURL();

      });
      this.create = true;
      this.isEnable = false;
      // Retornamos la variable donde la hemos guardado
      return this.createImage;
    }
  }

  // Método que actualiza la imagen
  resetImage() {
    this.create = false;
    this.isEnable = true;
    this.createPicture();
  }

  // Método que genera el PDF
  createPDF() {
    const pdfDefinition: any = {
      info: {
        // Titulo del documento PDF
        title: this.name,
      },
      // Orientación de la página
      pageOrientation: 'landscape',
    // Contenido del PDF
      content: [
        {
          table: {
            widths: [70, 400, 90, 50, 70, 50],
            heights: [70, 20, 20, 250],
            body: [
              [
                {
                  // Logo UtW en base64
                  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAMgCAYAAADbcAZoAAABJmlDQ1BBZG9iZSBSR0IgKDE5OTgpAAAoz2NgYDJwdHFyZRJgYMjNKykKcndSiIiMUmA/z8DGwMwABonJxQWOAQE+IHZefl4qAwb4do2BEURf1gWZxUAa4EouKCoB0n+A2CgltTiZgYHRAMjOLi8pAIozzgGyRZKywewNIHZRSJAzkH0EyOZLh7CvgNhJEPYTELsI6Akg+wtIfTqYzcQBNgfClgGxS1IrQPYyOOcXVBZlpmeUKBhaWloqOKbkJ6UqBFcWl6TmFit45iXnFxXkFyWWpKYA1ULcBwaCEIWgENMAarTQZKAyAMUDhPU5EBy+jGJnEGIIkFxaVAZlMjIZE+YjzJgjwcDgv5SBgeUPQsykl4FhgQ4DA/9UhJiaIQODgD4Dw745AMDGT/0ZOjZcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGz2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4wLWMwMDAgNzkuMTM1N2M5ZSwgMjAyMS8wNy8xNC0wMDozOTo1NiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6QXR0cmliPSJodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcDpDcmVhdG9yVG9vbD0iQ2FudmEiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA0LTAxVDE3OjE3OjIyKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNC0wMVQxNzoxOTowMyswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wNC0wMVQxNzoxOTowMyswMjowMCIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkFkb2JlIFJHQiAoMTk5OCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTU3YjE2YTEtZjQ1Mi05MTQyLTg5ZWEtNzljODc5MmJjZTIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1N2IxNmExLWY0NTItOTE0Mi04OWVhLTc5Yzg3OTJiY2UyMSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU1N2IxNmExLWY0NTItOTE0Mi04OWVhLTc5Yzg3OTJiY2UyMSI+IDxBdHRyaWI6QWRzPiA8cmRmOlNlcT4gPHJkZjpsaSBBdHRyaWI6Q3JlYXRlZD0iMjAyMi0wNC0wMSIgQXR0cmliOkV4dElkPSIxMzVjYzY0YS0wMzQ3LTQ1NWItOWZiMC1iZDA4MjdjYWY5OWMiIEF0dHJpYjpGYklkPSI1MjUyNjU5MTQxNzk1ODAiIEF0dHJpYjpUb3VjaFR5cGU9IjIiLz4gPC9yZGY6U2VxPiA8L0F0dHJpYjpBZHM+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+UHVycGxlIGFuZCBCbGFjayBOZW9uIFNjaSBGaSBUd2l0Y2ggUHJvZmlsZSBQaWN0dXJlPC9yZGY6bGk+IDwvcmRmOkFsdD4gPC9kYzp0aXRsZT4gPGRjOmNyZWF0b3I+IDxyZGY6U2VxPiA8cmRmOmxpPkFudG9uMTBNYXRhPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC9kYzpjcmVhdG9yPiA8eG1wTU06SGlz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X/6yu/zozixceOGFv6gkqi18eJymqYJgbJkDAlARV1555duSivYIXnLJJReHXd3dZQABBIASCBv3TUxMtCt8idMLu7oDIIAAsJLChn1h476k4vOhwq7ub33rW1/hjgMIIACsoIUN+6ZrcKnTC7u7AyCAALASrrjiip8NG/bV5XrXrl07FXZ5d+cBBBAAVsBCj8B0jS55OuzyHoadufsAAggAI3TNNde8JWzUV7frDru8Lww7A2AM2QeEOtimCKiiXy3UtY6HYWdnnXVW48477xyoCXhPg/FiJ3TG2gte8ILppfy566+/3gs2UHlnn31283GPe9zpSqLavKchgAAAACyROSAAAIAAAgAACCAAAAACCAAAIIAAAAAIIAAAgAACAAAIIAAAAAIIAAAggAAAAAggAACAAAIAAAggAAAAAggAACCAAAAACCAAAIAAAgAACCAAAAACCAAAIIAAAAAIIAAAgAACAAAIIAAAAAIIAAAggAAAAAggAACAAAIAAAggAAAAAggAACCAAAAACCAAAIAAAgAAIIAAAAACCAAAIIAAAAAIIAAAgAACAAAggAAAAAIIAAAggAAAAAggAACAAAIAACCAAAAAAggAACCAAAAACCAAAIAAAgAAIIAAAAACCAAAIIAAAAAIIAAAgAACAAAggAAAAAIIAAAggAAAAAggAACAAAIAACCAAAAAAggAAIAAAgAACCAAAIAAAgAAIIAAAAACCAAAgAACAAAIIAAAgAACAAAggAAAAAIIAACAAAIAAAggAACAAAIAACCAAAAAAggAAIAAAgAACCAAAIAAAgAAIIAAAAACCAAAgAACAAAIIAAAgAACAAAggAAAAAIIAACAAAIAAAggAAAAAggAACCAAAAAAggAAIAAAgAACCAAAAACCAAAIIAAAAACCAAAgAACAAAIIAAAAAIIAAAggAAAAAIIAACAAAIAAAggAAAAAggAACCAAAAAAggAAIAAAgAACCAAAAACCAAAIIAAAAACCAAAgAACAAAIIAAAAMfk/wetMskjpFomUwAAAABJRU5ErkJggg==',
                  width: 70,
                  height: 70,
                  style: 'logo'
                },
                {
                  // Nombre de la tarea
                  // 5 clumnas
                  colSpan: 5,
                  text: this.name,
                  style: 'title'
                },
                {}, {}, {}, {}
              ],
              [
                {
                  // Objetivos
                  text: 'Objetivos',
                  style: 'subheader'
                },
                {
                  // Data de los objetivos
                  text: this.objectives,
                  style: 'paragraph'
                },
                {
                  // Dimensiones
                  text: 'Dimensiones',
                  style: 'subheader'
                },
                {
                  // Data de las dimensiones
                  text: this.dimensions,
                  style: 'paragraph2'
                },
                {
                  // Duración
                  text: 'Duración',
                  style: 'subheader'
                },
                {
                  // Data de la duración
                  text: this.duration,
                  style: 'paragraph2'
                }
              ],
              [
                {
                  // Imagen de la tarea
                  // 2 columnas y 2 filas
                  image: this.createImage,
                  rowSpan: 2,
                  colSpan: 2,
                  width: 470,
                  height: 300,
                  style: 'task'
                },
                {},
                {
                  // Descripción de la tarea
                  // 4 columnas
                  text: 'Descripción',
                  colSpan: 4,
                  style: 'description'
                },
                {},
                {},
                {}
              ],
              [
                {},
                {},
                {
                  // Data de la descripción
                  // 4 columnas
                  text: this.description,
                  colSpan: 4,
                  style: 'paragraph'
                },
                {},
                {},
                {}
              ]
            ]
          },
          // Cambio de color de los bordes

          // layout: {
          //   hLineColor: function (i, node) {
          //     return (i === 0 || i === node.table.body.length) ? 'green' : 'red';
          //   },
          //   vLineColor: function (i, node) {
          //     return (i === 0 || i === node.table.widths.length) ? 'red' : 'red';
          //   },
          // }
        },
      ],
      // Estilos de cada una de las clases para el PDF
      styles: {
        title: {
          // Tamaño de letra
          fontSize: 40,
          // Negrita
          bold: true,
          // Color de letra
          color: '#FF0000',
          // Alineación
          alignment: 'center',
          // Background color
          fillColor: '#000000',
          margin: [0, 10, 0, 0]

        },
        paragraph: {
          fontSize: 12,
          color: '#FFFFFF',
          alignment: 'justify',
          fillColor: '#FF0000',
          margin: [0, 2, 0, 0]
        },
        paragraph2: {
          fontSize: 12,
          color: '#FFFFFF',
          alignment: 'center',
          fillColor: '#FF0000',
          margin: [0, 2, 0, 0]
        },
        subheader: {
          fontSize: 15,
          alignment: 'center',
          fillColor: '#FF0000',
        },
        logo: {
          alignment: 'center',
          fillColor: '#000000',
        },
        task: {
          fillColor: '#FF0000',
        },
        description: {
          alignment: 'center',
          fontSize: 18,
          fillColor: '#FF0000',
        }
      }
    }

    // Variable que crea el PDF
    const pdf = pdfMake.createPdf(pdfDefinition);
    // Tambien se puede usar el método download directamente
    pdf.open();

  }

}
