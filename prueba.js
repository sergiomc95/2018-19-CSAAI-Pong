//-- Definir el objeto BOLA
function pelota(){
  //-- Posición inicial de la pelota
  this.x_ini1 = 61,
  this.y_ini1 = 195,
  this.x_ini2 = 492,
  this.y_ini2 = 195,
  //-- Dimensiones de la Bola
  this.width = 5,
  this.height = 5,
  //-- Coornenadas
  this.x = 0,
  this.y = 0,
  //-- Velocidad
  //if (jugandojugador1){
    this.vx = 4,
//  }else {
//    this.vx = -4,
//  }
  this.vy = 2,
  //-- Contexto
  this.ctx = null,
  //-- Inicializar la bola
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset1();
  },
  //-- Dibujar
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  },
  //-- Update
  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  },
  //-- Reset: Set the ball to the initial state
  this.reset1 = function() {
    this.x = this.x_ini1;
    this.y = this.y_ini1;
  }
  this.reset2 = function() {
    this.x = this.x_ini2;
    this.y = this.y_ini2;
  }
}
//--RAQUETAS
function pala(posx,posy){
  //-- Posición inicial de la pelota
  this.x_ini = posx;
  this.y_ini = posy;
  //-- Dimensiones de la Bola
  this.width = 10;
  this.height = 40;
  //-- Coornenadas
  this.x =  0;
  this.y = 0;
  //-- Velocidad
  this.vx = 0;
  this.vy = 0;
  //-- Contexto
  this.ctx = null;
  //-- Inicializar la bola
  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  };
  //-- Dibujar
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  };
  //-- Update
  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  };
  //-- Reset: Set the ball to the initial state
  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  };
}

function contador(){
  this.ctx = null,
  this.puntuacion1 = 0;
  this.puntuacion2 = 0;
  this.puntuacion_init1 = 0;
  this.puntuacion_init2 = 0;

  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  },
  this.draw = function () {
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.puntuacion_init1, 220, 50);
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.puntuacion_init2, 380, 50);
  },
  //-- Update
  this.update = function () {
    this.puntuacion_init1 = this.puntuacion1;
    this.puntuacion_init2 = this.puntuacion2;
  },
  //-- Reset: Set the ball to the initial state
  this.reset = function() {
    this.puntuacion_init1 = 0;
    this.puntuacion_init2 = 0;
  }
}
function main(){

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  var jugador1 = new pala(50,180);
  var jugador2 = new pala(500,180);
  var bola = new pelota();
  var puntuacion = new contador();
  var jugandojugador1 = true;
  jugador1.init(ctx)
  jugador2.init(ctx)
  jugador1.draw();
  jugador2.draw();
  bola.init(ctx)
  bola.draw()
  puntuacion.init(ctx);
  puntuacion.draw();
  //linea del centro
  ctx.setLineDash([7, 10]);
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 400);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'white';
  ctx.stroke();
  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;
  //-- Boton de salcar
  var sacar = document.getElementById('sacar')
  //-- Función de retrollamda del botón de sacar.
  sacar.onclick = () => {
    //-- Si la bola ya se está animando,
    //-- no hacer nada
    if (!timer) {
      //-- Lanzar el timer. Su funcion de retrollamada la definimos
      //-- en su primer parámetro
      timer = setInterval(()=>{
        //-- Esto se ejecuta cada 20ms
        //actualizar jugadores
        jugador1.update()
        jugador2.update()
        //-- Actualizar la bola
        bola.update();
        puntuacion.update();
        //-- Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //-- Dibuar la bola y palas
        bola.draw();
        jugador1.draw();
        jugador2.draw();
        puntuacion.draw();
        //linea del centro
        ctx.setLineDash([7, 10]);
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        //-- Si la bola llega a la parte derecha del canvas:
        //-- Rebotar
        if (bola.x > canvas.width) {
          puntuacion.puntuacion1 += 1;
          //-- Eliminar el timer
          clearInterval(timer)
          timer = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //-- Bola a su posicion inicial
          //linea del centro
          ctx.setLineDash([7, 10]);
          ctx.moveTo(300, 0);
          ctx.lineTo(300, 400);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white';
          ctx.stroke();

          bola.reset2();
          jugador1.reset();
          jugador2.reset();
          puntuacion.update();
          //-- Dibujar la bola en pos. inicial
          bola.draw();
          jugador1.draw();
          jugador2.draw();
          puntuacion.draw();
        }
        if (bola.x < 0) {
          puntuacion.puntuacion2 += 1;
          clearInterval(timer)
          timer = null;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //-- Bola a su posicion inicial
          //linea del centro
          ctx.setLineDash([7, 10]);
          ctx.moveTo(300, 0);
          ctx.lineTo(300, 400);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white';
          ctx.stroke();

          bola.reset1();
          jugador1.reset();
          jugador2.reset();
          puntuacion.update();
          //-- Dibujar la bola en pos. inicial
          bola.draw();
          jugador1.draw();
          jugador2.draw();
          puntuacion.draw();
        }
        if (bola.y > canvas.height || bola.y < 0) {
          bola.vy = -bola.vy
        }
        if (bola.x < (jugador1.x + jugador1.width) && bola.y < (jugador1.y + jugador1.height) && bola.y > jugador1.y) {
          if (bola.x < jugador1.x) {
            bola.vx = bola.vx
          }else {
            bola.vx = -bola.vx
          }
        }
        if (bola.x > jugador2.x && bola.y < (jugador2.y + jugador2.height) && bola.y > jugador2.y) {
          if (bola.x > (jugador2.x + jugador2.width)) {
            bola.vx = bola.vx
          }else {
            bola.vx = -bola.vx
          }
        }
        window.onkeydown = (e) => {
          e.preventDefault();
          switch (e.key) {
            case 'w':
              jugador1.vy = -5;
              break;
            case 's':
              jugador1.vy = 5;
              break;
            case 'ArrowUp':
              jugador2.vy = -5;
              break;
            case 'ArrowDown':
              jugador2.vy = 5;
              break;
            default:
              break;
          }
        }
        window.onkeyup = (e) => {
          switch (e.key) {
            case 'w':
              jugador1.vy = 0;
              break;
            case 's':
              jugador1.vy = 0;
              break;
            case 'ArrowUp':
              jugador2.vy = 0;
              break;
            case 'ArrowDown':
              jugador2.vy = 0;
              break;
            default:
              break;
          }
        }
      },20); //-- timer
    }
  } //-- Fin onclick
  var reset = document.getElementById('reset')
  reset.onclick = () => {
    puntuacion.puntuacion1 = 0;
    puntuacion.puntuacion2 = 0;
    clearInterval(timer);
    timer = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //-- Bola a su posicion inicial
    //linea del centro
    ctx.setLineDash([7, 10]);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    jugador1.init(ctx);
    jugador2.init(ctx);
    jugador1.draw();
    jugador2.draw();
    bola.init(ctx);
    bola.draw();
    puntuacion.init(ctx);
    puntuacion.draw();
  }
}
