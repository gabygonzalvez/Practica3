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

    //draganddrop
    let cv01 = document.querySelector('#cv01');
    cv01.ondragover = function (e){ //solo hay que cancelar las acciones por defecto que lleva asociadas
        e.stopPropagation(); //se puede capturar cuando baja hacia abajo o cuando sube hacia arriba, se corta la propagacion para que no baje para abajo
        e.preventDefault(); //return false;
    }

    cv01.ondrop = function(e){
        e.stopPropagation();
        e.preventDefault();

        let fichero = e.dataTransfer.files[0],
            fr = new FileReader();

        fr.onload = function(){
            let img = newImage();
            img.onload = function(){
                let ctx = cv01.getContext('2d');
                ctx.drawImage(img, 0,0,_ANCHO_,_ALTO_);
            };
            img.src = fr.result;
        };

        fr.readAsDataURL(fichero);

    }

    // evento de ratón

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
        document.querySelector('#posXY').innerHTML=`(${x},${y}) (Col:${col},Fila:${fila})`;
        console.log('repintado suuuuu')

        //pintar trozo imagen
        cv02.width = cv02.width;
        let ctx02 = cv02.getContext('2d');
        ctx02.drawImage(cv01,col*dim,fila*dim,dim, dim,col*dim,fila*dim,dim,dim);
        dibujarLineas();

    }

         cv02.onmouseenter = function (e){
        let x = e.offsetX;
            y = e.offsetY;

        document.querySelector('#posEXY').innerHTML=`(${x},${y})`;

    }

        cv02.onmouseleave = function (e){
        let x = e.offsetX;
            y = e.offsetY;

        document.querySelector('#posSXY').innerHTML=`(${x},${y})`;
         }

         cv02.onclick = function (e){
        let x = e.offsetX,
            y = e.offsetY,
            dim = e.target.width / ncols;
            [col,fila]=sacarFilaColumna(e);
        

        document.querySelector('#posClickXY').innerHTML=`(${x},${y})`;

        document.querySelector('#posFC').innerHTML=`(${fila},${col})`;

        //mostrar región imagen original

        let ctx01 = cv01.getContext('2d');
        let ctx02 = cv02.getContext('2d');
        let imgData = ctx01.getImageData(col*dim,fila*dim,dim,dim);

        ctx02.putImageData(imgData,col*dim,fila*dim);
        dibujarLineas();

         }

         cv02.onmousedown = function (e){
        let x = e.offsetX;
            y = e.offsetY;

        document.querySelector('#posDownXY').innerHTML=`(${x},${y})`;
         }

         cv02.onmouseup = function (e){
        let x = e.offsetX;
            y = e.offsetY;

        document.querySelector('#posUpXY').innerHTML=`(${x},${y})`;
         }

}

function prueba01(){
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.strokeStyle = '#a00';
        ctx.lineWidth = 2;
        ctx.strokeRect(0,0,100,75);
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

function pintarImagen01(){
        let cv = document.querySelector('#cv01'),
            ctx = cv.getContext('2d'),
            img = new Image();

        img.onload = function(){
            ctx.drawImage(img,0,0, cv.width, cv.height);
        }
        img.src='/home/pcw/Escritorio/javi.jpg';

}

function pintarImagen02(){
        let cv = document.querySelector('#cv01'),
            ctx = cv.getContext('2d'),
            img = new Image();

        img.onload = function(){
            ctx.drawImage(img, 300, 300, 100, 100, 20, 20, 100, 100);
        }
        img.src='/home/pcw/Escritorio/javi.jpg';

}

function copiarCanvas(){
        let cv01 = document.querySelector('#cv01'),
            cv02 = document.querySelector('#cv02'),
            ctx01 = cv01.getContext('2d'),
            ctx02 = cv02.getContext('2d'),
            imgData;
            //imgData es vector, cada pixel 4 posiciones (f,g,b,a)

            imgData=ctx01.getImageData(0,0,cv01.width, cv01.height);
            ctx02.putImageData(imgData,0,0);

}

function dibujarLineas(){
        let cv = document.querySelector('#cv02'),
            ctx = cv.getContext('2d'),
            dim = cv.width/ncols;

            ctx.beginPath();
            ctx.strokeStyle = '#a00';
            ctx.lineWidth = 2;

            for(let i=1; i<ncols; i++){
                //lineashorizontales
                ctx.moveTo(0, i * dim);
                ctx.lineTo(cv.width, i * dim);
                //lineasverticales
                ctx.moveTo(i*dim, 0);
                ctx.lineTo(i * dim, cv.height);
            }
            ctx.rect(0,0,cv.width, cv.height);
            ctx.stroke();
}