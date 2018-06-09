
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
var  ncols;
var dim;
var nfilas;


var dimX;
var dimY;

var puzzle = [];

var total;

function separandopiezas(){
    puzzle=[];
    dimX = _ANCHO_/ncols; //ancho  de cada pieza
    dimY= _ALTO_/nfilas; //alto de cada pieza

    console.log(dimX);

    var dimXArr=0;
    var dimYArr=0;
    var contadorcin = 0;

    console.log("mer subnormal");
    console.log(ncols);
    console.log("AYYY");
    console.log(nfilas);


    console.log('Hola llegas?');
    for(let k=0; k<nfilas; k++){
        console.log(k);
        for(let h=0; h<ncols; h++){

           var fichina={ //creamos la ficha
                orX:null, //origen x
                orY:null, //origen y
                id:-1
            }

            fichina.orX=dimXArr;
            fichina.orY=dimYArr;
            fichina.id=contadorcin;
            puzzle.push(fichina);
            contadorcin++;

            dimXArr += dimX;
            console.log(fichina);

        }
        dimXArr=0; //reescribe la columna
        dimYArr += dimY;
    }
        
        function desordenarArray(){

            var i=pizza.length;

            while(i--){
                var j=Math.floor(Math.random()*(i+1));
                var tmp=puzzle[i];
                puzzle[i]=puzzle[j];
                puzzle[j]=tmp;
            }

        };

        console.log(puzzle);
}

dimXpuzzle=0;
dimYpuzzle=0;
cont=0;



function sacarFilaColumna(e){
    let x = e.offsetX,
        y = e.offsetY;

        dim = e.target.width / ncols;
        
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
    
    cv.onclick = function(e){

    }

    //drag and drop

    cv.ondragover = function(e){

        if(e.stopPropagation)
            e.stopPropagation();

        e.preventDefault();

        context.strokeStyle="#ff0000";
        context.lineWidth=3;
        context.rect(0,0,_ANCHO_, _ALTO_);
        context.stroke();
    };

    cv.ondragleave = function(e){
       if(e.stopPropagation)
            e.stopPropagation();

        e.preventDefault();

        context=clearRect(0, 0, _ANCHO_, _ALTO_);
        if(document.getElementById('').value==""){
            limpiarCanvas();  
            context.drawImage(img, 0,0,_ANCHO_,_ALTO_);
            dibujarLineas();
        }

    }


    cv.ondrop = function(e){

        if(e.stopPropagation){
            e.stopPropagation();
        	e.preventDefault();}


        let ficheros = e.dataTransfer.files;

        if(ficheros.length > 0){
            var fichero = ficheros[0];
            var imagen = new FileReader();

            imagen.onload = function(e){
                 dibujarLineas(); 
                //para dibujar la imagen
                img.onload = function(){
                    
                                    
                    limpiarCanvas();  
                    context.drawImage(img, 0,0,_ANCHO_,_ALTO_);
                    dibujarLineas();
                };
                img.src = e.target.result;
            };

            imagen.onchange=function(e){
                
                 img.onload = function(){                      
                    limpiarCanvas();  
                    context.drawImage(img, 0,0,_ANCHO_,_ALTO_);
                    dibujarLineas();
                };
                img.src = e.target.result;
            };
            imagen.readAsDataURL(fichero);
        }

    }

    //EVENTO DE RATON MOVIENDOSE POR ENCIMA
	let cv02 = document.querySelector('#cv02');
	    cv02.onmousemove = function (e){
	        let x = e.offsetX,
	            y = e.offsetY,
	            dim = e.target.width / ncols;

                //LLAMAMOS A SACAR FILA COLUMNA
	        [col,fila]=sacarFilaColumna(e);

            console.log(col);
            console.log(fila);

            document.getElementById("mostrarcol").innerHTML=col;
            document.getElementById("mostrarfila").innerHTML=fila;

            /*
	        if(cv02.getAttribute('data-FC')){
	            let FC =  JSON.parse(cv02.getAttribute('data-FC'));
	            if(FC.fila== fila == FC.col == col){
	                return;
	            }
	        }
	        let FC = {'col': col, 'fila':fila};
	        cv02.setAttribute('data-FC',JSON.stringify(FC));
	        document.querySelector('#posXY').innerHTML=`(${x},${y}) (Col:${col},Fila:${fila})`;
	        console.log('repintado suuuuu')
*/
        }


        //ESTO ES PARA CAMBIAR LAS PIEZAS
       /* cv02.onmousedown = function (e){
        let x = e.offsetX;
            y = e.offsetY;

        document.querySelector('#posDownXY').innerHTML=`(${x},${y})`;
         }

         cv02.onmouseup = function (e){
        let x = e.offsetX;
            y = e.offsetY;

        document.querySelector('#posUpXY').innerHTML=`(${x},${y})`;
         }*/



}


function deshabilitarBotones(){
    document.getElementById("b1").disabled=true;

    document.getElementById("b2").disabled=true;

    document.getElementById("b3").disabled=true;

}

function habilitarBotones(){
    document.getElementById("b1").disabled=false;

    document.getElementById("b2").disabled=false;

    document.getElementById("b3").disabled=false;
  

}

function habilitarempezar(){
document.getElementById("b1").disabled=false;

}



function copiarCanvas(){
        let cv01 = document.querySelector('#cv01'),
            cv02 = document.querySelector('#cv02'),
            ctx01 = cv01.getContext('2d'),
            ctx02 = cv02.getContext('2d'),
            imgData;
            //imgData es vector, cada pixel 4 posiciones (f,g,b,a)

            
             separandopiezas();


             console.log("eii");
             console.log(total);

             console.log(puzzle[6].orX);
             console.log(dimX);

             for(var ini=0; ini < total; ini++){
                console.log(ini);
                console.log(puzzle[ini].orX);
                console.log(puzzle[ini].orY);
                console.log(dimX);
                console.log(dimY);

                imgData=ctx01.getImageData(puzzle[ini].orX, puzzle[ini].orY, dimX, dimY);
                ctx02.putImageData(imgData,puzzle[ini].orX,puzzle[ini].orY);
             }

            
            
}

function pintarImagen01(){
    let cv = document.querySelector('#cv01'),
    ctx = cv.getContext('2d'),
    img = new Image();
    puzzle=[];
    var ficheros=event.target.files;

    if(ficheros.length===0){
        return;
    }

    var fichero=ficheros[0];

    if(fichero.type!== '' && !fichero.type.match('image.*')){
        return;
    }

    var imagenURL = window.URL.createObjectURL(fichero);

    img.onload = function(e){
        limpiarCanvas();  
        ctx.drawImage(img, 0,0,_ANCHO_,_ALTO_);
        dibujarLineas();
    };

    img.src=imagenURL;
    /*
    document.getElementById("ima").blur;

    document.getElementById("ima").addEventListener("blur", copiarCanvas);
    document.getElementById("ima").addEventListener("blur", habilitarBotones);*/

}

function dibujar(){
	let cv02 = document.querySelector('#cv02');
    cv02.onmousemove = function (e){
        let x = e.offsetX,
            y = e.offsetY,
            dim = e.target.width / ncols;

        [col,fila]=sacarFilaColumna(e);

        if(cv02.getAttribute('data-FC')){
            let FC =  JSON.parse(cv02.getAttribute('data-FC'));
            if(FC.fila== fila == FC.col == col){
                return;
            }
        }
        let FC = {'col': col, 'fila':fila};
        cv02.setAttribute('data-FC',JSON.stringify(FC));
        document.querySelector('#posXY').innerHTML='(${x},${y}) (Col:${col},Fila:${fila})';
        console.log('repintado suuuuu')

        //pintar trozo imagen
        cv02.width = cv02.width;
        let ctx02 = cv02.getContext('2d');
        ctx02.drawImage(cv01,col*dim,fila*dim,dim, dim,col*dim,fila*dim,dim,dim);
        dibujarLineas();

    }
}




function empezar(){
   habilitarBotones();
   contador=setInterval(tiempo, 1000);
   dibujarLineas();
}




function dibujarLineas(){

        let cv = document.querySelector('#cv02'),
            ctx = cv.getContext('2d'),
            color = document.getElementById("color").value,
            dificultad = document.getElementById("dificultad").value;
            


            if(dificultad=="facil")
                ncols=6;
            else if(dificultad=="media")
                ncols=9;
            else
                ncols=12;

            dim = cv.width/ncols;

            nfilas=_ALTO_/dim;
            total=nfilas*ncols;

            console.log("A VER LA DIMENSION QUE ES");
            console.log(dim);
            console.log("A VER LAS COLUMNAS");
            console.log(ncols);


            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            
            //llama a canvas una vez que lo borra
            
                ctx.clearRect(0, 0, cv.width, cv.height);
            
                copiarCanvas();
                

            for(let i=1; i<ncols; i++){
                //lineashorizontales
                ctx.moveTo(0, i * dim);
                ctx.lineTo(cv.width, i * dim);
                //lineasverticales
                ctx.moveTo(i*dim, 0);
                ctx.lineTo(i * dim, cv.height);
            }
            ctx.strokeRect(0,0,cv.width, cv.height);
            ctx.stroke();

            habilitarempezar();
            
}
var seg=0;
var mov=0;
var pie=0;


function terminar(){
    let cv = document.querySelector('#cv02');
    let cv1 = document.querySelector('#cv01');
            
        document.getElementById("ima").value="";
        clearInterval(contador);
        
        mov=0;
        pie=0;

        location.href="#openModal";
        document.getElementById('mostrarsegundos').innerText = seg;

        seg=0;
        document.getElementById('segundos').innerText = seg;

        cv.width = cv.width;
        cv1.width = cv1.width;
        deshabilitarBotones();
        prepararCanvas();

}



function tiempo(){
    seg+= 1;
    document.getElementById('segundos').innerText = seg;
}