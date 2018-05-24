
/*function pintarrectangulo(){
	let cv= document.querySelector(body>section:first-of-type>canvas),
	ctx=cv.getContext('2d');
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 2;
	ctx.fillStyle = '#0a0';

	ctx.strokeRect(40, 50, 100, 75);

	ctx.fillRect(150, 20, 80, 60);
}*/




var _ANCHO_= 360,
    _ALTO_ = 360;
var  ncols = 3;
function sacarFilaColumna(e){
    let x = e.offsetX,
            y = e.offsetY,
            dim = e.target.width / ncols;
        let fila;         
        let col;
    col=Math.floor(x/dim);
    fila=Math.floor(y/dim);

    return[col,fila]
}
function prepararCanvas(){
    let cvs = document.querySelectorAll('canvas'); //devuelve un vector de canvas

    cvs.forEach(function(e){
        e.width = _ANCHO_;
        e.height = _ALTO_;
    });
}





function trasladar(){
        let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.translate(100,100);

}


function escalar(){
        let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.scale(1,2);

}

function rotar(){
        let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d'),
        ang = 45;

        ctx.rotate(Math.PI * (ang/180));

}

function limpiar(e){
        //let cv = document.querySelector('#cv01');
        let footer = e.target.parentNode;
        section= footer.parentNode;
        cv= section.querySelector('canvas');

        cv.width = cv.width;
}