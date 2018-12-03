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
