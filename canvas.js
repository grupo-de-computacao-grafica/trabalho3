class Face{
  
  constructor(canvas,arestas){
    self.canvas=canvas;
    self.arestas=arestas;
    
  }
  
  desenhar(){
    for(aresta in self.arestas){
      aresta.desenhar(self.canvas);
    }
  }
}

class Aresta{
  constructor(ponto1,ponto2)
  {
    self.ponto1=ponto1;
    self.ponto2=ponto2;
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
    self.x=x;
    self.y=y;
  }
}
