class Quaternion
{
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
		var si=Math.sin(theta/2);
		this.y=si*ponto.x;
		this.z=si*ponto.y;
		this.w=si*ponto.z;
	}
	
	constructor()
	{
		if(arguments.length == 4)
		{
			this._constructorAlgebrico.apply(this,arguments);
		}
		this._constructorRotacao.apply(this,arguments);
	}
	
	//rodar o parametro em torno do this.ponto de um angulo theta
	rodar(ponto)
	{
		var pontoExtendido=new Quaternion(0,ponto.x,ponto.y,ponto.z);
		var conjugadoP=new Quaternion(this.x,-this.y,-this.z,-this.w);
		return this.multiply(pontoExtendido,conjugadoP);
	}
	//precisa que ponto implemente produto escalar e vetorial
	multiply()
	{
		var acumulador=new Quaternion(this.x,this.y,this.z,this.w);
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
	rodar(q)
	{
		var aux=q.rodar(new Ponto(this.x,this.y,this.z));
		this.x=aux.y;
		this.y=aux.z;
		this.z=aux.w;
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
	rodar(q)
	{
		this.atual.rodar(q);
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
		this.inicio.rodar(q);
		this.meio1.rodar(q);
		this.meio2.rodar(q);
		this.fim.rodar(q);
	}
	transladar(x,y,z)
	{
		this.inicio.transladar(x,y,z);
		this.meio1.transladar(x,y,z);
		this.meio2.transladar(x,y,z);
		this.fim.transladar(x,y,z);
	}
}

class Face
{
	constructor(bezier)
	{
		this.bezier=bezier;
	}
	desenhar(ctx)
	{
		ctx.beginPath();
		for(let i = 0; i < this.bezier.length; i++)
		{
			this.bezier[i].desenhar(ctx);
		}
	}
	transladar(x,y,z)
	{
		for(i in this.bezier)
		{
			this.bezier[i].transladar(x,y,z);
		}
	}
	rodar(q)
	{
		for(i in this.bezier)
		{
			this.bezier[i].rodar(q);
		}		
	}
}

class Solido
{
	constructor(faces)
	{
		this.faces=faces;
	}
	transladar(x,y,z)
	{
		for(i in this.faces)
		{
			this.faces[i].transladar(x,y,z);
		}
	}
	rodar(q)
	{
		for(i in this.faces)
		{
			this.faces[i].rodar(q);
		}
	}
	desenhar(ctx)
	{
		for(i in this.faces)
		{
			this.faces[i].desenhar(ctx);
		}		
	}
}
const m = 10;


function meuDeepCopyVertice(v)
{
	var p=new Ponto(0,0,0);
	p.x=v.atual.x;
	p.y=v.atual.y;
	p.z=v.atual.z;
	
	var p2=new Ponto(0,0,0);
	p2.x=v.original.x;
	p2.y=v.original.y;
	p2.z=v.original.z;
	
	var v1 = new Vertice(0,0,0);
	v1.atual=p;
	v1.original=p2;
	return v1;
}

function meuDeepCopyBezier(b)
{
	var novoInicio=meuDeepCopyVertice(b.inicio);
	var novoMeio1=meuDeepCopyVertice(b.meio1);
	var novoMeio2=meuDeepCopyVertice(b.meio2);
	var novoFim=meuDeepCopyVertice(b.fim);
	
	return new Bezier(novoInicio,novoMeio1,novoMeio2,novoFim);
}

function meuDeepCopyFace(f)
{
	var l=[];
	for (i in f.bezier)
	{
		l.push(meuDeepCopyBezier(f.bezier[i]));
	}
	return new Face(l);
}

function faceExtrude(face)
{
	var newFace = meuDeepCopyFace(face);
	newFace.transladar(0,0,m);
	newFace.bezier;
	var facesLaterais = []
	for (i in face.bezier)
	{
		var arestaBaixo=face.bezier[i];
		var arestaCima=newFace.bezier[i];
		
		var verticeInicial=new Vertice(arestaCima.inicio.getX(),arestaCima.inicio.getY(),arestaCima.inicio.getZ());
		var verticeFinal=new Vertice(arestaBaixo.inicio.getX(),arestaBaixo.inicio.getY(),arestaBaixo.inicio.getZ());
		
		var verticeMeio1=verticeInicial;
		var verticeMeio2=verticeFinal;
		
		var arestaInicio=new Bezier(verticeInicial,verticeMeio1,verticeMeio2,verticeFinal);
		
		var verticeInicial2=new Vertice(arestaCima.fim.getX(),arestaCima.fim.getY(),arestaCima.fim.getZ());
		var verticeFinal2=new Vertice(arestaBaixo.fim.getX(),arestaBaixo.fim.getY(),arestaBaixo.fim.getZ());
		
		var verticeMeio12=verticeInicial2;
		var verticeMeio22=verticeFinal2;
		
		var arestaFim=new Bezier(verticeInicial2,verticeMeio12,verticeMeio22,verticeFinal2);
		
		
		facesLaterais.push(new Face([arestaBaixo,arestaCima,arestaInicio,arestaFim]));
		
		
	}
	return new Solido(facesLaterais);
	
}


const canvas = document.getElementById("letra-I");
const ctx=canvas.getContext("2d");

var originX = 100;//window.innerWidth/2 - 100;
var originY = 100;//window.innerHeight/2 - 100;

function getCurvasForLetterI(x,y,z=0) {
	const positions = [
		[[0, 0,0], [33, -10,0], [66, -10,0], [100, 0,0]],
		[[100, 0,0], [110, 10,0], [110, 20,0], [100, 33,0]],
		[[100, 33,0], [88, 40,0], [75, 40,0], [66, 33,0]],
		[[66, 33,0], [70, 46,0], [70, 56,0], [66, 66,0]],
		[[66, 66,0], [75, 56,0], [88, 56,0], [100, 66,0]],
		[[100, 66,0], [110, 80,0], [110, 88,0], [100, 100,0]],
		[[100, 100,0], [66, 110,0], [33, 110,0], [0, 100,0]],
		[[0, 100,0], [-10, 88,0], [-10, 80,0], [0, 66,0]],
		[[0, 66,0], [12, 56,0], [22, 56,0], [33, 66,0]],
		[[33, 66,0], [30, 54,0], [30, 44,0], [33, 33,0]],
		[[33, 33,0], [22, 43,0], [11, 43,0], [0, 33,0]],
		[[0, 33,0], [-10, 22,0], [-10, 13,0], [0, 0,0]]
	];
	return positions.map(pt => new Bezier(new Vertice(x + pt[0][0], y + pt[0][1],z + pt[0][2]), new Vertice(x + pt[1][0], y + pt[1][1],z + pt[1][2]), new Vertice(x + pt[2][0], y + pt[2][1],z + pt[2][2]), new Vertice(x + pt[3][0], y + pt[3][1],z + pt[3][2])));

}

var face = new Face(getCurvasForLetterI(originX,originY));
var solido = faceExtrude(face);
//bez=new Bezier(new Vertice(0,0),new Vertice(33,10),new Vertice(66,10),new Vertice(100,100));
ctx.beginPath();
//face.desenhar(ctx);

solido.desenhar(ctx);

solido.transladar(100,100,100);


var q=new Quaternion(Math.pi/2,new Ponto(300,300,300));
solido.rodar(q);
solido.desenhar(ctx);





