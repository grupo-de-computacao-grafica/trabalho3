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
		ctx.bezierCurveTo(this.meio1.getX(),this.meio1.getY()
				,this.meio2.getX(),this.meio2.getY()
				.this.fim.getX(),this.fim.getY());
		ctx.stroke();
	}
	desenhar()
	{
		ctx.moveTo(0, 0);
		ctx.bezierCurveTo(33, -10, 66, -10, 100, 0);
		ctx.bezierCurveTo(110, 10, 110, 20, 100, 33);
		ctx.bezierCurveTo(88, 40, 75, 40, 66, 33);
		ctx.bezierCurveTo(70, 46, 70, 56, 66, 66);
		ctx.bezierCurveTo(75, 56, 88, 56, 100, 66);
		ctx.bezierCurveTo(110, 80, 110, 88, 100, 100);
		ctx.bezierCurveTo(66, 110, 33, 110, 0, 100);
		ctx.bezierCurveTo(-10, 88, -10, 80, 0, 66);
		ctx.bezierCurveTo(12, 56, 22, 56, 33, 66);
		ctx.bezierCurveTo(30, 54, 30, 44, 33, 33);
		ctx.bezierCurveTo(22, 43, 11, 43, 0, 33);
		ctx.bezierCurveTo(-10, 22, -10, 13, 0, 0);
		ctx.stroke();
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
const canvas = document.getElementById("letra-I");
const ctx=canvas.getContext("2d");
