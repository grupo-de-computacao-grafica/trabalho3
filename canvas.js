class Vertice{
	constructor(x,y){
		this.atual=new Ponto(x,y);
		this.original=new Ponto(x,y);
	}
	reset(){
		this.atual=new Ponto(this.original.x,this.original.y);
	}
	rodar(theta){
		this.atual.rodar(theta);
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
	for(let i = 0; i<arestas.length; i++){
		arestas[i].rodar(theta);
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




setInterval(() => {ctx.clearRect(0,0,canvas.width,canvas.height); face.desenhar(ctx); face.transladar(5,5); },50);
