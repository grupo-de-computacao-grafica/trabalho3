class Face{
  
  constructor(canvas,arestas){
    this.canvas=canvas;
    this.arestas=arestas;
    
  }

  desenhar(){
    for(let i; i < this.arestas.length; i++) {
      arestas[i].desenhar(this.canvas);
    }
  }
}

class Aresta{
  constructor(ponto1,ponto2)
  {
    this.ponto1=ponto1;
    this.ponto2=ponto2;
  }
  
  desenhar(canvas){
    canvas.moveTo(ponto1.x,ponto1.y);
    canvas.lineTo(ponto2.x,ponto2.y);
    canvas.stroke();
  }
}

class Ponto{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
  }
}

class Bootstrap {
  constructor() {
    console.log('Bootstrap');
    const ctx=document.getElementById("letra-I").getContext("2d");
    const arestas=[]
    arestas[0]= new Aresta(new Ponto(0,0), new Ponto(100,0));
    arestas[1]= new Aresta(new Ponto(100,0),new Ponto(100,30));
    arestas[2]= new Aresta(new Ponto(100,30),new Ponto(66,30));
    arestas[3]= new Aresta(new Ponto(66,30),new Ponto(66,100));
    arestas[4]= new Aresta(new Ponto(66,100),new Ponto(100,100));
    arestas[5]= new Aresta(new Ponto(100,100),new Ponto(100,130));
    arestas[6]= new Aresta(new Ponto(100,130),new Ponto(0,130));
    arestas[7]= new Aresta(new Ponto(0,130),new Ponto(0,100));
    arestas[8]= new Aresta(new Ponto(0,100),new Ponto(33,100));
    arestas[9]= new Aresta(new Ponto(33,100),new Ponto(33,30));
    arestas[10]= new Aresta(new Ponto(33,30),new Ponto(0,30));
    arestas[11]= new Aresta(new Ponto(0,30), new Ponto(0,0));
    const face= new Face(ctx, arestas);
    face.desenhar()
  }
}

//initialize
(() => {
  setTimeout(() => new Bootstrap(), 1000);
})();