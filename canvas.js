class Face{
  
  constructor(canvas,arestas){
    this.canvas=canvas;
    this.arestas=arestas;
    
  }
  
  desenhar(){
    for(aresta in this.arestas){
      aresta.desenhar(this.canvas);
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
