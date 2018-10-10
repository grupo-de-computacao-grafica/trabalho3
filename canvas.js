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
	for(let i = 0; i<arestas.length; i++){
		centroidex = centroidex + arestas[i].vertice1.getX() + arestas[i].vertice2.getX();
		centroidey = centroidey + arestas[i].vertice1.getY() + arestas[i].vertice2.getY();
	}
	centroidex=centroidex-arestas[0].vertice1.getX();
	centroidey=centroidey-arestas[0].vertice1.getY();
	var numeroPontos=arestas.length*2-1;
	var centroide = new Ponto(centroidex/numeroPontos,centroidey/numeroPontos);
	for(let i = 0; i<arestas.length; i++){
		arestas[i].rodar(theta,centroide);
	}
  }

  transladar(dx,dy){
	for(let i = 0; i<arestas.length; i++){
		arestas[i].transladar(dx,dy);
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
const arestas=[
new Aresta(new Vertice(0,0), new Vertice(100,0)),
new Aresta(new Vertice(100,0),new Vertice(100,30)),
new Aresta(new Vertice(100,30),new Vertice(66,30)),
new Aresta(new Vertice(66,30),new Vertice(66,100)),
new Aresta(new Vertice(66,100),new Vertice(100,100)),
new Aresta(new Vertice(100,100),new Vertice(100,130)),
new Aresta(new Vertice(100,130),new Vertice(0,130)),
new Aresta(new Vertice(0,130),new Vertice(0,100)),
new Aresta(new Vertice(0,100),new Vertice(33,100)),
new Aresta(new Vertice(33,100),new Vertice(33,30)),
new Aresta(new Vertice(33,30),new Vertice(0,30)),
new Aresta(new Vertice(0,30), new Vertice(0,0))];
const face= new Face(arestas);



class Bootstrap {
  constructor() {
    console.log('Bootstrap');
    face.desenhar(ctx)
  }
}




setInterval(() => {ctx.clearRect(0,0,canvas.width,canvas.height); face.desenhar(ctx); face.transladar(5,5); face.rodar(90*3.141592/180/100);},50);
