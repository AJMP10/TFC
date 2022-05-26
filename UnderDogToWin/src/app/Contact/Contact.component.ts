import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Objeto con los campos del formulario

  data: FormGroup;

  constructor(private http: HttpClient) {
    // Objeto con los campos del formulario
    this.data = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      surName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      consult: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  sendEmail() {
    //  Librería para mostrar una notificación mientras carga la petición
    Notiflix.Loading.init({
      svgColor: '#ff0000',
      messageColor: '#ffffff',
    });
    Notiflix.Loading.pulse('Su petición se está procesando...')
    let params = {
      name: this.data.value.name,
      lastName: this.data.value.lastName,
      surName: this.data.value.surName,
      email: this.data.value.email,
      consult: this.data.value.consult
    }
    // Petición Http al backend con el objeto de los datos del formulario
    this.http.post('http://localhost:3000/correo', params).subscribe(
      resp => {
        console.log(resp);
        Notiflix.Loading.remove();
        Notiflix.Notify.success('Su petición se ha enviado correctamente');
      },
      error => {
        console.log(error);
        Notiflix.Loading.remove();
        Notiflix.Notify.failure('Ha ocurrido un error al enviar su petición');
      })
  }
}
