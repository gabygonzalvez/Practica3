
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
    _ALTO_ = 240;
var  ncols = 3;

function sacarFilaColumna(e){
    let x = e.offsetX,
            y = e.offsetY,
            dim = e.target.width / ncols;
        let fila;         
        let col;
    col=Math.floor(x/dim);
    fila=Math.floor(y/dim);

    return[col,fila];
}

function prepararCanvas(){
    let cvs = document.querySelectorAll('canvas'); //devuelve un vector de canvas
    let cv = document.getElementById("cv01");
    let context = cv.getContext('2d');
    let img = document.createElement("img");
    let tienteTexto = true;

    cvs.forEach(function(e){
        e.width = _ANCHO_;
        e.height = _ALTO_;
    });


    limpiarCanvas = function(){ //para limpiar el texto predeterminado cuando imagen
        if(tienteTexto){
            context.clearRect(0,0,cv.width,cv.height);
            tienteTexto = false;
        }
    };


    context.fillStyle = '#b57b7b';          //texto predeterminado
    context.font = 'bold 18px sans-serif';
    context.textAlign = 'center';
    context.fillText('Haz click o arrastra una imagen aquí',180,120);


    //drag and drop

    cv.ondragover = function(e){

        if(e.stopPropagation)
            e.stopPropagation();

        e.preventDefault();
    }

    cv.ondrop = function(e){

        if(e.stopPropagation)
            e.stopPropagation();
        e.preventDefault();


        let ficheros = e.dataTransfer.files;

        if(ficheros.length > 0){
            var fichero = ficheros[0];
            var imagen = new FileReader();

            imagen.onload = function(e){
                //para dibujar la imagen
                img.onload = function(){
                    limpiarCanvas();                   
                    context.drawImage(img, 0,0,_ANCHO_,_ALTO_);
                };
                img.src = e.target.result;
            };
            imagen.readAsDataURL(fichero);
        }
    }



}



function empezar(){
   
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