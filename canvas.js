class Vertices{
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
}

class Aresta{
  constructor(vertice1,vertice2) {
    this.vertice1=vertice1;
    this.vertice2=vertice2;
  }
  
  desenharPrimeiro(canvas){
    canvas.moveTo(this.vertice1.x,this.vertice1.y);
    canvas.lineTo(this.vertice2.x,this.vertice2.y);
	canvas.stroke();
  }
  
  desenhar(canvas){
    canvas.lineTo(this.vertice1.x,this.vertice1.y);
    canvas.lineTo(this.vertice2.x,this.vertice2.y);
	canvas.stroke();
  }
}

class Ponto{
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }
}

class Vertice{
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }
}

class Bootstrap {
  constructor() {
    console.log('Bootstrap');
    const ctx=document.getElementById("letra-I").getContext("2d");
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
      new Aresta(new Vertice(0,30), new Vertice(0,0))
    ];
    const face= new Face(arestas);
    face.desenhar(ctx)
  }
}

//initialize
(() => {
  setTimeout(() => new Bootstrap(), 100);
})();
