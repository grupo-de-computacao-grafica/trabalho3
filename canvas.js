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
    canvas.fill();
  }
}

class Aresta{
  constructor(ponto1,ponto2) {
    this.ponto1=ponto1;
    this.ponto2=ponto2;
  }
  
  desenharPrimeiro(canvas){
    canvas.moveTo(this.ponto1.x,this.ponto1.y);
    canvas.lineTo(this.ponto2.x,this.ponto2.y);
  }
  
  desenhar(canvas){
    canvas.lineTo(this.ponto1.x,this.ponto1.y);
    canvas.lineTo(this.ponto2.x,this.ponto2.y);
  }
}

class Ponto{
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
      new Aresta(new Ponto(0,0), new Ponto(100,0)),
      new Aresta(new Ponto(100,0),new Ponto(100,30)),
      new Aresta(new Ponto(100,30),new Ponto(66,30)),
      new Aresta(new Ponto(66,30),new Ponto(66,100)),
      new Aresta(new Ponto(66,100),new Ponto(100,100)),
      new Aresta(new Ponto(100,100),new Ponto(100,130)),
      new Aresta(new Ponto(100,130),new Ponto(0,130)),
      new Aresta(new Ponto(0,130),new Ponto(0,100)),
      new Aresta(new Ponto(0,100),new Ponto(33,100)),
      new Aresta(new Ponto(33,100),new Ponto(33,30)),
      new Aresta(new Ponto(33,30),new Ponto(0,30)),
      new Aresta(new Ponto(0,30), new Ponto(0,0))
    ];
    const face= new Face(arestas);
    face.desenhar(ctx)
  }
}

//initialize
(() => {
  setTimeout(() => new Bootstrap(), 100);
})();
