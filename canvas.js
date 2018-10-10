class Vertice{
	constructor(x,y){
		this.atual=new Ponto(x,y);
		this.original=new Ponto(x,y);
	}
	reset(){
		this.atual=new Ponto(this.original.x,this.original.y);
	}
	rodar(theta,ponto){
		this.atual.rodar(theta,ponto);
	}
	transladar(dx,dy){
		this.atual.transladar(dx,dy);
	}
	getX(){
		return this.atual.x;
	}
	getY(){
		return this.atual.y;
	}
}

class Face{
  constructor(arestas) {
    this.arestas=arestas;
  }

  desenhar(canvas){
    canvas.beginPath();
    this.arestas[0].desenharPrimeiro(canvas);
    for(let i = 1; i < this.arestas.length; i++) {
      this.arestas[i].desenhar(canvas);
    }
  }

  rodar(theta){
	var centroidex=0;
	var centroidey=0;
	for(let i = 0; i<this.arestas.length; i++){
		centroidex = centroidex + this.arestas[i].vertice1.getX() + this.arestas[i].vertice2.getX();
		centroidey = centroidey + this.arestas[i].vertice1.getY() + this.arestas[i].vertice2.getY();
	}
	centroidex=centroidex-this.arestas[0].vertice1.getX();
	centroidey=centroidey-this.arestas[0].vertice1.getY();
	var numeroPontos=this.arestas.length*2-1;
	var centroide = new Ponto(centroidex/numeroPontos,centroidey/numeroPontos);
	for(let i = 0; i<this.arestas.length; i++){
		this.arestas[i].rodar(theta,centroide);
	}
  }

  transladar(dx,dy){
	for(let i = 0; i<this.arestas.length; i++){
		this.arestas[i].transladar(dx,dy);
	}

  }
}

class Aresta{
  constructor(vertice1,vertice2) {
    this.vertice1=vertice1;
    this.vertice2=vertice2;
  }
  transladar(dx,dy){
	  this.vertice1.transladar(dx,dy);
	  this.vertice2.transladar(dx,dy);
  }
  desenharPrimeiro(canvas){
    canvas.moveTo(this.vertice1.getX(),this.vertice1.getY());
    canvas.lineTo(this.vertice2.getX(),this.vertice2.getY());
	canvas.stroke();
  }
  
  desenhar(canvas){
    canvas.lineTo(this.vertice1.getX(),this.vertice1.getY());
    canvas.lineTo(this.vertice2.getX(),this.vertice2.getY());
	canvas.stroke();
  }
	
  rodar(theta,ponto){
	  this.vertice1.rodar(theta,ponto);
	  this.vertice2.rodar(theta,ponto);
	  
  }
}

class Ponto{
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }
  transladar(dx,dy){
	  this.x=this.x+dx;
	  this.y=this.y+dy;
  }
  rodar(theta,ponto){
	  this.transladar(-ponto.x,-ponto.y);
	  this.x=this.x*Math.cos(theta)-this.y*Math.sin(theta);
	  this.y=this.x*Math.sin(theta)+this.y*Math.cos(theta);
	  this.transladar(ponto.x,ponto.y);
  }
}
const canvas = document.getElementById("letra-I");
const ctx=canvas.getContext("2d");

var originX = window.innerWidth/2 - 100;
var originY = window.innerHeight/2 - 100;

function getArestasForLetterI(x,y) {
	const positions = [
		[[0,0], [100,0]],
		[[100,0], [100,30]],
		[[100,30], [66,30]],
		[[66,30], [66,100]],
		[[66,100], [100,100]],
		[[100,100], [100,130]],
		[[100,130], [0,130]],
		[[0,130], [0,100]],
		[[0,100], [33,100]],
		[[33,100], [33,30]],
		[[33,30], [0,30]],
		[[0,30], [0,0]]
	];
	return positions.map(pt => new Aresta(new Vertice(x + pt[0][0], y + pt[0][1]), new Vertice(x + pt[1][0], y + pt[1][1])));

}

const face = new Face(getArestasForLetterI(originX,originY));



class Bootstrap {
  constructor() {
    console.log('Bootstrap');
    face.desenhar(ctx)
  }
}


window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}
resizeCanvas();

sumTheta = 0;
setInterval(() => {

	const pi = 3.141592;
	if(sumTheta > pi) return;

	ctx.clearRect(0,0,canvas.width,canvas.height); 
	face.desenhar(ctx); 
	face.transladar(5,5); 

	const theta = 90*pi/45/100;
	face.rodar(theta);

	sumTheta += theta;

},50);
