class Quaternion
{
	constructor()
	{
		if(arguments.length == 4)
		{
			_constructorAlgebrico.apply(null,arguments);
		}
		_constructorRotacao.apply(null,arguments);
	}
	_constructorAlgebrico(x,y,z,w)
	{
		this.x=x;
		this.y=y;
		this.z=z;
		this.w=w;
	}
	_constructorRotacao(theta,ponto)
	{
		this.x=Math.cos(theta/2);
		si=Math.sin(theta/2);
		this.y=si*ponto.x;
		this.z=si*ponto.y;
		this.w=si*ponto.z;
	}
	//rodar o parametro em torno do this.ponto de um angulo theta
	rodar(ponto)
	{
		pontoExtendido=new Quaternion(0,ponto.x,ponto.y,ponto.z);
		conjugadoP=new Quaternion(this.x,-this.y,-this.z,-this.w);
		return this.multiply(pontoExtendido,conjugadoP);
	}
	//precisa que ponto implemente produto escalar e vetorial
	multiply()
	{
		acumulador=new Quaternion(this.x,this.y,this.z,this.w);
		for(let i=0; i<arguments.length; i++)
		{
			acumulador.x=acumulador.x*arguments[i].x-acumulador.y*arguments[i].y-acumulador.z*arguments[i].z-acumulador.w*arguments[i].w;
			acumulador.y=acumulador.x*arguments[i].y+arguments[i].x*acumulador.y+acumulador.z*arguments[i].w-acumulador.w*arguments[i].z;
			acumulador.z=acumulador.x*arguments[i].z+arguments[i].x*acumulador.z+acumulador.w*arguments[i].y-acumulador.y*arguments[i].w;
			acumulador.w=acumulador.x*arguments[i].w+arguments[i].x*acumulador.w+acumulador.y*arguments[i].z-acumulador.z*arguments[i].y;
		}
		return acumulador;
	}
	
	
}

class Ponto
{
	constructor(x,y,z)
	{
		this.x=x;
		this.y=y;
		this.z=z;
	}
	transladar(dx,dy,dz)
	{
		this.x=this.x+dx;
		this.y=this.y+dy;
		this.z=this.z+dz;
	}
	pespectiva()
	{
		this.x=Math.sqrt(2)/2*(this.x-this.y);
		this.y=Math.sqrt(2/3)*this.z-1/Math.sqrt(6)*(this.x+this.y);
		this.z=0;
	}
	rodar(thetax,thetay,thetaz,ponto)
	{
		this.transladar(-ponto.x,-ponto.y,-ponto.z);
		this.x=this.x*Math.cos(theta)-this.y*Math.sin(theta);
		this.y=this.x*Math.sin(theta)+this.y*Math.cos(theta);
		this.transladar(ponto.x,ponto.y);
	}
}


class Vertice
{
	constructor(x,y,z=0)
	{
		this.atual=new Ponto(x,y,z);
		this.original=new Ponto(x,y,z);
	}
	pespectiva()
	{
		this.atual.pespectiva();
	}
	reset()
	{
		this.atual=new Ponto(this.original.x,this.original.y,this.original.z);
	}
	rodar(thetax,thetay,thetaz,ponto)
	{
		this.atual.rodar(thetax,thetay,thetaz,ponto);
	}
	transladar(dx,dy,dz)
	{
		this.atual.transladar(dx,dy,dz);
	}
	getX()
	{
		return this.atual.x;
	}
	getY()
	{
		return this.atual.y;
	}
	getZ()
	{
		return this.atual.z;
	}
}
class Bezier
{
	//parametros são vertices
	constructor(inicio,meio1,meio2,fim)
	{
		this.inicio=inicio;
		this.meio1=meio1;
		this.meio2=meio2;
		this.fim=fim;
	}
	desenhar(ctx)
	{
		ctx.moveTo(this.inicio.getX(),this.inicio.getY());
		ctx.bezierCurveTo(this.meio1.getX(),this.meio1.getY(),this.meio2.getX(),this.meio2.getY(),this.fim.getX(),this.fim.getY());
		ctx.stroke();
	}
	rodar(q)
	{
		this.inicio=q.rodar(this.inicio);
		this.meio1=q.rodar(this.meio1);
		this.meio2=q.rodar(this.meio2);
		this.fim=q.rodar(this.fim);
	}
}

class Face
{
	constructor(arestas)
	{
		this.arestas=arestas;
	}
}

class Solido
{
	constructor(faces)
	{
		this.faces=faces;
	}
}

const canvas = document.getElementById("letra-I");
const ctx=canvas.getContext("2d");

bez=new Bezier(new Vertice(0,0),new Vertice(33,10),new Vertice(66,10),new Vertice(100,100));
ctx.beginPath();
bez.desenhar(ctx);
