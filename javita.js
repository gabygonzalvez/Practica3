
/*function pintarrectangulo(){
	let cv= document.querySelector(body>section:first-of-type>canvas),
	ctx=cv.getContext('2d');
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 2;
	ctx.fillStyle = '#0a0';

	ctx.strokeRect(40, 50, 100, 75);

	ctx.fillRect(150, 20, 80, 60);
}*/

var contadorito=0;
var puedes=false;
var actual;
var _ANCHO_= 360,
    _ALTO_ = 240;
var  ncols;
var dim;
var nfilas;
var rand=false;
var numMovimientos=0;
var piezasMal=0;

var dimX;
var dimY;

var puzzle = [];
var puzzlemezclado = [];

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
    puzzlemezclado=puzzle.slice();
        
        /*function desordenarArray(){

            var i=puzzle.length;

            while(i--){
                var j=Math.floor(Math.random()*(i+1));
                var tmp=puzzle[i];
                puzzle[i]=puzzle[j];
                puzzle[j]=tmp;
            }

        };*/

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
    contarMal();

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
	    cv02.onmouseup = function (e){

	        let x = e.offsetX,
	            y = e.offsetY,
	            dim = e.target.width / ncols;

                //LLAMAMOS A SACAR FILA COLUMNA
	        [col,fila]=sacarFilaColumna(e);

            
            console.log(col);
            console.log(fila);


            
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

function habilitarbotonespreempezar(){
     document.getElementById("color").disabled=false;

    document.getElementById("ima").disabled=false;
    
    document.getElementById("dificultad").disabled=false;
}

function habilitarBotones(){
   

    document.getElementById("b1").disabled=false;

    document.getElementById("b2").disabled=false;

    document.getElementById("b3").disabled=false;
  

}

function habilitarempezar(){
document.getElementById("b1").disabled=false;
}




var mal;

///RESALTAR LAS PIEZAS!! 

function botonayuda(){
  let cv2 = document.getElementById("cv02");
  var ctx = cv2.getContext('2d');
  var enc = false;
  console.log(enc);

  mal=0;
  for(let i = 0; i < total; i++){
    enc = true; //por encima sirve para que no de error al pasar el raton por encima sin activar el boton de ayuda
    if(puzzle[i].id != puzzlemezclado[i].id){ // si i es distinto de la id
      //console.log("pos i " + i);
      //console.log("pos array " + arrayPiezasMezcladas[i].id);
      ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.fillRect(puzzlemezclado[i].orX, puzzlemezclado[i].orY, dimX, dimY) //igual hay que cambiarlo por las cosas del metodo de abajo
      ctx.stroke();
      mal++;
    }
    else{
      //ctx.rect(arrayPiezas[i].orX, arrayPiezas[i].orY, dimX, dimY) //igual hay que cambiarlo por las cosas del metodo de abajo
    }
  }

  cv2.onmouseover = function(e) {
    if(enc == true && puedes==true){
      console.log(enc);
      e.stopPropagation();
      e.preventDefault();
      enc = false;

      ctx.clearRect(0,0,_ANCHO_, _ALTO_)
      rand=true; 
      dibujarLineasmezcladas();
    }
  }
}

function porencimapieza(){
    
        console.log("eiii");
        let cv2 = document.querySelector('#cv02'),
        ctx = cv2.getContext('2d');
        var enc=false;




        /*
        cv2.onmousemove=function(e){
            if(puedes==true){
                let x=e.offsetX,
                    y=e.offsetY,
                    dim=e.target.width / ncols;

                let fila;
                let col;
                col=Math.floor(x/dim);
                fila=Math.floor(y/dim);
               

                dibujarLineasmezcladas();

                
               for(let i=0; i<total; i++){
               
                if(puzzle[i].orX < x && x < puzzle[i].orX+dimX && puzzle[i].orY < y && y < puzzle[i].orY+dimY){
                     enc=true;
                     console.log("buasss");
                    ctx.strokeStyle="#ff8e8e";
                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.rect(puzzle[i].orX, puzzle[i].orY, dimX, dimY);
                    ctx.stroke();
                    actual=puzzle[i].id;
                    //
                }
               
               }
            }
               
               
                
            
        }*/

        /*cv2.onmouseout=function(e){
            if(puedes==true){
                let x=e.offsetX,
                    y=e.offsetY,
                    dim=e.target.width / ncols;

                let fila;
                let col;
                let color=document.getElementById("color").value;
                col=Math.floor(x/dim);
                fila=Math.floor(y/dim);

               


               console.log(x)
               console.log(y)

               for(let i=0; i<total; i++){
               
                if(puzzle[i].orX < x && x < puzzle[i].orX+dimX && puzzle[i].orY < y && y < puzzle[i].orY+dimY){
                     enc=true;
                     console.log("buasss");
                    ctx.strokeStyle=color;
                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.rect(puzzle[i].orX, puzzle[i].orY, dimX, dimY);
                    ctx.stroke();
                    actual=puzzle[i].id;
                    //
                }
               
               }
            }
        }*/

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

function contarMal(){
    piezasMal=0;

    for(let i=0; i<total; i++){
        if(puzzle[i].id != puzzlemezclado[i].id){
            piezasMal++;    
        }else{
            piezasMal--;
        }
        
        
    }
    document.getElementById('contarMal').innerText = piezasMal;

}


function empezar(){
    let cv2 = document.querySelector('#cv02');
    ctx = cv2.getContext('2d');
    var seleccionada=false;
    var pieza;
    var piezaAux;
    var auxId;
    var auxId2;
    var color=document.getElementById("color").value;

    if(puedes==false){
        puedes=true;
    }

   habilitarBotones();
   contador=setInterval(tiempo, 1000);
   
   console.log(piezasMal);
   console.log(puzzle);
   dibujarLineasmezcladas(); //cuando empieza, a randomizar
    contarMal();
    document.getElementById("color").disabled=true;
    document.getElementById("ima").disabled=true;
    document.getElementById("dificultad").disabled=true;

   cv2.onclick = function(e){
        if(puedes==true && seleccionada==false){
            let x=e.offsetX,
                y=e.offsetY,
                dim=e.target.width / ncols;

            let fila;
            let col;
            col=Math.floor(x/dim);
            fila=Math.floor(y/dim);

            console.log("fila 1: " + fila);
            console.log("col 1: "+ col);

            for(let i=0; i<total && seleccionada==false; i++){
                   
                if(puzzlemezclado[i].orX < x && x < puzzlemezclado[i].orX+dimX && puzzlemezclado[i].orY < y && y < puzzlemezclado[i].orY+dimY){
                    ctx.strokeStyle="#ff0000";
                    ctx.lineWidth=2;
                    ctx.beginPath();
                    ctx.rect(puzzlemezclado[i].orX, puzzlemezclado[i].orY, dimX, dimY);
                    ctx.stroke();
                    seleccionada=true;
                    pieza=i;
                    console.log("primer for: " + pieza)
               }
            }
        }
        else if(seleccionada==true){
            let x=e.offsetX,
                y=e.offsetY,
                dim=e.target.width / ncols;

            let fila;
            let col;
            fila=Math.floor(x/dim);
            col=Math.floor(y/dim);

            console.log("fila 2: " + fila);
            console.log("col 2: " + col);

            for(let i=0; i<total; i++){
                   
                if(puzzlemezclado[i].orX < x && x < puzzlemezclado[i].orX+dimX && puzzlemezclado[i].orY < y && y < puzzlemezclado[i].orY+dimY){
                    if(i==pieza){ //si es igual que no haga nada?
                        ctx.strokeStyle=color;
                        ctx.lineWidth=2;
                        ctx.beginPath();
                        ctx.rect(puzzlemezclado[i].orX, puzzlemezclado[i].orY, dimX, dimY);
                        ctx.stroke();
                        seleccionada=false;
                    }
                    else{

                        console.log(puzzlemezclado[pieza]);
                        console.log(puzzlemezclado[i]);

                        auxId=puzzlemezclado[i].id;
                        auxId2=puzzlemezclado[pieza].id;

                        console.log("ID AUX DEL I " + auxId)
                        console.log("ID AUZ DEL 2 DE PIEZA" + auxId2)



                        piezaAux=puzzlemezclado[i];
                        puzzlemezclado[i]=puzzlemezclado[pieza];
                        puzzlemezclado[pieza]=piezaAux;

                        /*
                        puzzlemezclado[i].id=auxId;
                        puzzlemezclado[pieza].id=auxId2;*/

                        seleccionada=false;
                        
                        aumentarmovimientos();

                        console.log("pieza que selecciono: " + i)
                        console.log("pieza cambiada: "+ pieza)

                        
                        let cv02 = document.querySelector('#cv02'),
                            ctx02 = cv02.getContext('2d'),
                            imgData;
                            
                            //imgData es vector, cada pixel 4 posiciones (f,g,b,a)
                            
                            cachin=ctx02.getImageData(puzzlemezclado[pieza].orX, puzzlemezclado[pieza].orY, dimX, dimY);

                            imgData=ctx02.getImageData(puzzlemezclado[i].orX, puzzlemezclado[i].orY, dimX, dimY);
                            
                            ctx02.putImageData(imgData, puzzlemezclado[pieza].orX, puzzlemezclado[pieza].orY);
                            ctx02.putImageData(cachin, puzzlemezclado[i].orX, puzzlemezclado[i].orY);
                            
                                /*console.log("PUZZLE ID PIEZA" + puzzle[i].id)
                                console.log("ID PIEZA DESORDENADA" + puzzlemezclado[i].id)

                                console.log(auxId + " deberia ser igual a: " + puzzlemezclado[pieza].id)
                                console.log(auxId2 + " deberia ser igual a: " + puzzlemezclado[i].id)
                               
                                console.log(puzzlemezclado[pieza].id + "no es igual que: " + puzzle[pieza].id)
                                console.log(puzzlemezclado[i].id + "no es igual que: " + puzzle[i].id)
*/
                                
                            contarMal();
                            console.log(puzzlemezclado[pieza]);
                            console.log(puzzlemezclado[i]);
                            comprobarcorrecto();

                        ctx.strokeStyle=color;
                        ctx.lineWidth=2;
                        ctx.beginPath();
                        ctx.rect(puzzlemezclado[i].orX, puzzlemezclado[i].orY, dimX, dimY);
                        ctx.stroke();
                    }
               }
            }
        }


   }

comprobarcorrecto();
porencimapieza();
   

}

var moves;


function comprobarcorrecto(){
    /*
    for(let i=0; i<total && contadorito<total; i++){
        if(puzzle[i].id == puzzlemezclado[i].id){
            contadorito ++;
            console.log("total:" + total)
            console.log("ccontadorin: " + contadorito)
        }
    }
    if(contadorito>=total){
        location.href="#openModal2";
        console.log("bien")
    }*/
}

function aumentarmovimientos(){
    
    numMovimientos++;
    document.getElementById("mostrarmovimientos").innerHTML=numMovimientos;
                        
     moves=numMovimientos;
}

function dibujarLineasmezcladas(){

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

            


            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            
            //llama a canvas una vez que lo borra
            
                ctx.clearRect(0, 0, cv.width, cv.height);
            
                copiarCanvasMezclado();
               
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
               

                imgData=ctx01.getImageData(puzzle[ini].orX, puzzle[ini].orY, dimX, dimY);
                ctx02.putImageData(imgData,puzzle[ini].orX,puzzle[ini].orY);
             }           
}



function copiarCanvasMezclado(){
        let cv01 = document.querySelector('#cv01'),
            cv02 = document.querySelector('#cv02'),
            ctx01 = cv01.getContext('2d'),
            ctx02 = cv02.getContext('2d'),
            imgData;
            var x=0, y=0;
            //imgData es vector, cada pixel 4 posiciones (f,g,b,a)

            
             if(rand==false){
                puzzlemezclado = puzzlemezclado.sort(function() {return Math.random() - 0.5});

                rand=true;
             }

             for(var i = 0; i<total; i++){
                imgData=ctx01.getImageData(puzzlemezclado[i].orX, puzzlemezclado[i].orY, dimX, dimY);
                ctx02.putImageData(imgData, x, y);
                x+=dimX;

                if( x==360){
                    y+= dimY;
                    x=0;
                }
             }    
            
}

var seg=0;
var pie=0;


function terminar(){
     
    let cv = document.querySelector('#cv02');
    let cv1 = document.querySelector('#cv01');
            
        document.getElementById("ima").value="";
        clearInterval(contador);
        
        pie=0;
        console.log("numMovimientos" + numMovimientos)
        location.href="#openModal";
        document.getElementById('mostrarsegundos').innerHTML = seg;
        document.getElementById('mostrarmovimientos').innerHTML = numMovimientos;
        document.getElementById('piezasmal').innerHTML = piezasMal;
        console.log(numMovimientos);
        rand=0;
        puedes=false;
        console.log(puedes);
        seg=0;
        piezasMal=0;
        numMovimientos=0;
       
        document.getElementById('segundos').innerText = seg;

        cv.width = cv.width;
        cv1.width = cv1.width;
        habilitarbotonespreempezar();
        deshabilitarBotones();
        prepararCanvas();
}



function tiempo(){
    seg+= 1;
    document.getElementById('segundos').innerText = seg;
}