import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-Pitch',
  templateUrl: './Pitch.component.html',
  styleUrls: ['./Pitch.component.scss']
})
export class PitchComponent implements OnInit, AfterViewInit {

  @ViewChild('ball') ball:ElementRef;
  public print:string;

  @ViewChild('canvasRef', { static: false }) canvasRef: any;
  isAvailable: boolean=false;
  clicks:number=0;
  color:string | any;
  materials:Array<string>=["balon","vallas","gol"];

  //  Ancho y alto del canvas
  public width = 1700;;
  public height = 600;

  private cx: CanvasRenderingContext2D | any;

  //  Almacenamiento de coordenadas
  private points: Array<any> = [];

  //Capturar cuando se mueva el raton
  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (e: any) => {
    if (e.target.id == 'canvasId' && this.isAvailable) {
      this.write(e);
    }
  }

  @HostListener('click', ['$event'])
  onClick=(e: any) =>{
    if(e.target.id=='canvasId'){
      this.isAvailable=!this.isAvailable;
      //  Color de la linea
      this.cx.strokeStyle=this.color;
      this.clicks++;
      console.log(this.cx.strokeStyle);
      if(this.clicks%2==0){
        this.points=[];
      }
    }

  }
  constructor(private renderer:Renderer2) { }

  //  Ejecuta la funcion cuando la etiqueta canvas ya existe
  ngAfterViewInit(): void {
    this.render();
  }

  ngOnInit() { }

  private render(): any {
    const canvasEl = this.canvasRef.nativeElement;

    //  Obtener el contexto del canvas para dibujar dentro de la etiqueta canvas
    this.cx = canvasEl.getContext('2d');



    //  Grosor del pincel
    this.cx.lineWidth = 3;
    //  Final de linea redondeado
    this.cx.lineCap = 'round';
  }

  private write(res: { clientX: number; clientY: number; }): any {
    const canvasEl = this.canvasRef.nativeElement;

    //Ubicación en pixeles de la pantalla
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    };

    this.writeSingle(prevPos);
  }

  // Obtener valores principio y final del dibujo
  private writeSingle = (prevPos: { x: number; y: number; }) => {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      // Valor previo de la linea
      const prevPost = this.points[this.points.length - 1];
      // Valor actual de la linea
      const currentPos = this.points[this.points.length - 2];
      this.drawOnCanvas(prevPost, currentPos);
    }
  }

  private drawOnCanvas(prevPos: any, currentPos: any) {
    if (!this.cx) {
      return;
    }
    //  Dibujar linea
    this.cx.beginPath();
    if(prevPos){
      //  Desde estas coordenadas
      this.cx.moveTo(prevPos.x, prevPos.y);
      //  Hasta estas coordenadas
      this.cx.lineTo(currentPos.x, currentPos.y);
      //  Dibujar
      this.cx.stroke();
    }
  }

  //  Limpiar el canvas y borrar el contenido dibujado
  public clearZone= () => {
    this.points = [];
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  newBall(){
    const balon=this.renderer.createElement("img");
    this.renderer.setAttribute(balon,"src","/assets/materials/balon.png");
    this.renderer.setAttribute(balon,"cdkDrag","");
    this.renderer.appendChild(this.ball.nativeElement,balon);

  }

  addMaterial(material:string){
    this.materials.push(material);
  }

  addMaterialInCanvas(material:string){
    /* Ver como conseguir mover el objeto */
    let imageObj = new Image();
    imageObj.src = "/assets/materials/"+material+".png";
    imageObj.setAttribute("cdkDragBoundary",".pitch"); 
    imageObj.setAttribute("cdkDrag","");
    this.cx.drawImage(imageObj, 0, 0, 20, 20);
    
  }

}
