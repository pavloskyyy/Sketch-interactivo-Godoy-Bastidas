
// DAMN. LIBRO INTERACTIVO - Barbara Herbabdez - Pablo Godoy - Agustin Bastidas - Angela Bagnara. 


let pagina = 0;
let siguientePagina = 0;

let transicion = false;
let transT = 0;
let dir = { x: 0, y: 0 };

let reiniciarDespues = false;
let rebobinando = false;
let rutaRebobinar = [];
let pasoRebobinar = 0;

let a = {};

let pBlood;
let pDNA;
let pPH;
let pFear;
let pDuck;
let pFinal;

let escalaIntro = 1;


function preload() {
  a.arriba = loadImage("flecha arriba.PNG");
  a.derecha = loadImage("Flecha derecha.PNG");
  a.abajo = loadImage("flecha para abajo.PNG");
  a.izquierda = loadImage("flecha izquierda.PNG");
  a.mouse = loadImage("flecha Mouse.PNG");

  a.damn1 = loadImage("damn 1.png");
  a.damn2 = loadImage("damn 2.png");

  a.kendrickSenora = loadImage("kendrick y señora.png");
  a.apuntando = loadImage("apuntando.png");
  a.disparo = loadImage("disparo.png");

  a.sentado1 = loadImage("sentado.png");
  a.sentado2 = loadImage("sentado 2.png");
  a.sentado3 = loadImage("sentado 3.png");

  a.kendrickMirando = loadImage("kendrick mirando para abajo.png");
  a.caraInferior = loadImage("cara inferior.png");
  a.caraMedio = loadImage("cara medio.png");
  a.caraSuperior = loadImage("cara superior.png");

  a.baby = loadImage("baby kendrick.png");
  a.mediano = loadImage("kendrick mediano.png");
  a.tercero = loadImage("kendrick tercero.png");

  a.ducky1 = loadImage("ducky 1.png");
  a.ducky2 = loadImage("ducky 2.png");
  a.ducky3 = loadImage("ducky 3.png");

  a.dead = loadImage("dead.png");
}



function setup() {
  createCanvas(1920, 1080);
  pixelDensity(1);
  resetearTodo();
}

function draw() {
  background(0);

  if (transicion) {
    dibujarTransicion();
  } else {
    actualizarPagina();
    dibujarPagina(pagina, 0, 0);
  }
}


function cambiarPagina(nueva, dx, dy, reiniciar, resetDestino) {
  if (transicion) return;

  siguientePagina = nueva;
  dir = { x: dx, y: dy };
  transT = 0;
  transicion = true;
  reiniciarDespues = reiniciar || false;

  if (resetDestino !== false) {
    resetearPagina(nueva);
  }
}

function dibujarTransicion() {
  transT += rebobinando ? 0.055 : 0.035;

  let t = constrain(transT, 0, 1);
  let e = ease(t);

  let mx = dir.x * width * e;
  let my = dir.y * height * e;

  dibujarPagina(pagina, -mx, -my);
  dibujarPagina(
    siguientePagina,
    dir.x * width - mx,
    dir.y * height - my
  );

  if (t >= 1) {
    pagina = siguientePagina;
    transicion = false;

    if (reiniciarDespues) {
      rebobinando = false;
      pagina = 0;
      escalaIntro = 1;
      resetearTodo();
      return;
    }

    if (rebobinando) {
      continuarRebobinar();
    }
  }
}

function ease(t) {
  if (t < 0.5) {
    return 4 * t * t * t;
  } else {
    return 1 - pow(-2 * t + 2, 3) / 2;
  }
}

function iniciarRebobinar() {
  rebobinando = true;
  pasoRebobinar = 0;

  rutaRebobinar = [
    { p: 4, x: 0, y: -1 },
    { p: 3, x: 0, y: -1 },
    { p: 2, x: -1, y: 0 },
    { p: 1, x: 0, y: -1 },
    { p: 0, x: 0, y: -1 },
    { p: 6, x: 1, y: 0 }
  ];

  prepararCompleta(rutaRebobinar[0].p);

  cambiarPagina(
    rutaRebobinar[0].p,
    rutaRebobinar[0].x,
    rutaRebobinar[0].y,
    false,
    false
  );
}

function continuarRebobinar() {
  pasoRebobinar++;

  if (pasoRebobinar >= rutaRebobinar.length) {
    rebobinando = false;
    prepararCompleta(6);
    return;
  }

  let r = rutaRebobinar[pasoRebobinar];

  prepararCompleta(r.p);

  cambiarPagina(
    r.p,
    r.x,
    r.y,
    false,
    false
  );
}

function prepararCompleta(n) {
  resetearPagina(n);

  if (n === 1) {
    pBlood.paso = 3;
    fijar(pBlood, {
      li: 255,
      lt: 255,
      ap: 0,
      di: 255,
      dt: 255,
      f1: 0,
      f2: 0,
      f3: 0
    });
  }

  if (n === 2) {
    pDNA.paso = 3;
    fijar(pDNA, {
      fr1: 0,
      fr2: 0,
      fr3: 255,
      t1: 255,
      t2: 255,
      t3: 255,
      f1: 0,
      f2: 0,
      f3: 0
    });
  }

  if (n === 3) {
    pPH.paso = 5;
    fijar(pPH, {
      izq: 255,
      ti: 255,
      td: 255,
      ci: 255,
      cm: 255,
      cs: 255,
      f1: 0,
      f2: 0,
      f3: 0,
      f4: 0,
      f5: 0
    });
  }

  if (n === 4) {
    for (let i = 0; i < 3; i++) {
      pFear.activo[i] = true;
      pFear.img[i] = 255;
      pFear.txt[i] = 255;
      pFear.esc[i] = 1.05;

      pFear.imgT[i] = 255;
      pFear.txtT[i] = 255;
      pFear.escT[i] = 1.05;
    }
  }

  if (n === 5) {
    pDuck.paso = 4;
    fijar(pDuck, {
      t1: 255,
      t2: 255,
      t3: 255,
      t4: 255,
      d1: 0,
      d2: 0,
      d3: 255,
      td: 255,
      boton: 255,
      f1: 0,
      f2: 0,
      f3: 0,
      f4: 0
    });
  }

  if (n === 6) {
    pFinal.paso = 1;
    fijar(pFinal, {
      txt: 255,
      boton: 255,
      flecha: 0
    });
  }
}


function keyPressed() {
  if (transicion) return false;

  // Página 1
  if (pagina === 0) {
    return false;
  }

  // Página 2 BLOOD
  if (pagina === 1) {
    if (pBlood.paso >= 3 && keyCode === DOWN_ARROW) {
      cambiarPagina(2, 0, 1);
    } else if (pBlood.paso === 0 && keyCode === RIGHT_ARROW) {
      objetivo(pBlood, {
        li: 255,
        lt: 255,
        slt: 1.04,
        f1: 0
      });
      pBlood.paso = 1;
    } else if (pBlood.paso === 1 && keyCode === RIGHT_ARROW) {
      objetivo(pBlood, {
        ap: 255,
        sap: 1.04,
        f2: 0
      });
      pBlood.paso = 2;
    } else if (pBlood.paso === 2 && keyCode === UP_ARROW) {
      objetivo(pBlood, {
        ap: 0,
        di: 255,
        sdi: 1.04,
        dt: 255,
        sdt: 1.04,
        f3: 0
      });
      pBlood.paso = 3;
    }
  }

  // Página 3 DNA
  else if (pagina === 2) {
    if (pDNA.paso >= 3 && keyCode === RIGHT_ARROW) {
      cambiarPagina(3, 1, 0);
    } else if (pDNA.paso === 0 && keyCode === RIGHT_ARROW) {
      objetivo(pDNA, {
        fr1: 255,
        t1: 255,
        f1: 0
      });
      pDNA.paso = 1;
    } else if (pDNA.paso === 1 && keyCode === RIGHT_ARROW) {
      objetivo(pDNA, {
        fr1: 0,
        fr2: 255,
        t2: 255,
        f2: 0
      });
      pDNA.paso = 2;
    } else if (pDNA.paso === 2 && keyCode === RIGHT_ARROW) {
      objetivo(pDNA, {
        fr2: 0,
        fr3: 255,
        t3: 255,
        f3: 0
      });
      pDNA.paso = 3;
    }
  }

  // Página 4 PRIDE / HUMBLE
  else if (pagina === 3) {
    if (pPH.paso >= 5 && keyCode === DOWN_ARROW) {
      cambiarPagina(4, 0, 1);
    } else if (pPH.paso === 0 && keyCode === RIGHT_ARROW) {
      objetivo(pPH, {
        izq: 255,
        ti: 255,
        f1: 0
      });
      pPH.paso = 1;
    } else if (pPH.paso === 1 && keyCode === RIGHT_ARROW) {
      objetivo(pPH, {
        td: 255,
        f2: 0
      });
      pPH.paso = 2;
    } else if (pPH.paso === 2 && keyCode === UP_ARROW) {
      objetivo(pPH, {
        ci: 255,
        f3: 0
      });
      pPH.paso = 3;
    } else if (pPH.paso === 3 && keyCode === UP_ARROW) {
      objetivo(pPH, {
        cm: 255,
        f4: 0
      });
      pPH.paso = 4;
    } else if (pPH.paso === 4 && keyCode === UP_ARROW) {
      objetivo(pPH, {
        cs: 255,
        f5: 0
      });
      pPH.paso = 5;
    }
  }

  // Página 5 
  else if (pagina === 4 && keyCode === DOWN_ARROW) {
    cambiarPagina(5, 0, 1);
  }

  // Página 6
  else if (pagina === 5) {
    if (pDuck.paso === 0 && keyCode === RIGHT_ARROW) {
      objetivo(pDuck, {
        t1: 255,
        f1: 0
      });
      pDuck.paso = 1;
    } else if (pDuck.paso === 1 && keyCode === DOWN_ARROW) {
      objetivo(pDuck, {
        d1: 255,
        t2: 255,
        f2: 0
      });
      pDuck.paso = 2;
    } else if (pDuck.paso === 2 && keyCode === DOWN_ARROW) {
      objetivo(pDuck, {
        d1: 0,
        d2: 255,
        t3: 255,
        f3: 0
      });
      pDuck.paso = 3;
    } else if (pDuck.paso === 3 && keyCode === DOWN_ARROW) {
      objetivo(pDuck, {
        d2: 0,
        d3: 255,
        t4: 255,
        td: 255,
        boton: 255,
        f4: 0
      });
      pDuck.paso = 4;
    }
  }

  // Página 7fin
  else if (pagina === 6 && keyCode === RIGHT_ARROW) {
    if (pFinal.paso === 0) {
      objetivo(pFinal, {
        txt: 255,
        boton: 255,
        flecha: 0
      });
      pFinal.paso = 1;
    }
  }

  return false;
}


function mousePressed() {
  if (transicion) return;

  // Switch página 1
  if (pagina === 0) {
    let sx = width / 1228;
    let sy = height / 689;

    let switchIntro = {
      x: 1143,
      y: 594,
      w: 71,
      h: 71
    };

    if (encima(switchIntro, sx, sy)) {
      cambiarPagina(1, 0, 1);
    }
  }

  //interruptores
  if (pagina === 4) {
    let sx = width / 818;
    let sy = height / 460;

    let sw = [
      { x: 43, y: 181, w: 25, h: 32 },
      { x: 298, y: 178, w: 25, h: 32 },
      { x: 550, y: 178, w: 25, h: 33 }
    ];

    for (let i = 0; i < 3; i++) {
      if (encima(sw[i], sx, sy)) {
        pFear.activo[i] = !pFear.activo[i];

        pFear.imgT[i] = pFear.activo[i] ? 255 : 70;
        pFear.txtT[i] = pFear.activo[i] ? 255 : 70;
        pFear.escT[i] = pFear.activo[i] ? 1.05 : 1;
      }
    }
  }

//boton 
  if (pagina === 5 && pDuck.paso >= 4) {
    let sx = width / 818;
    let sy = height / 460;

    let boton = {
      x: 613,
      y: 330,
      w: 147,
      h: 42
    };

    if (encima(boton, sx, sy)) {
      iniciarRebobinar();
    }
  }

//boton pa volver a empezar
  if (pagina === 6 && pFinal.paso >= 1) {
    let sx = width / 617;
    let sy = height / 314;

    let boton = {
      x: 441,
      y: 211,
      w: 130,
      h: 36
    };

    if (encima(boton, sx, sy)) {
      cambiarPagina(0, 1, 0, true, false);
    }
  }
}

function estado(valores) {
  return {
    paso: 0,
    v: { ...valores },
    t: { ...valores }
  };
}

function objetivo(e, valores) {
  for (let k in valores) {
    e.t[k] = valores[k];
  }
}

function fijar(e, valores) {
  for (let k in valores) {
    e.v[k] = valores[k];
    e.t[k] = valores[k];
  }
}

function animar(e) {
  for (let k in e.t) {
    e.v[k] = lerp(e.v[k], e.t[k], 0.08);
  }
}

function resetearTodo() {
  resetearPagina(1);
  resetearPagina(2);
  resetearPagina(3);
  resetearPagina(4);
  resetearPagina(5);
  resetearPagina(6);
}

function resetearPagina(n) {
  if (n === 1) {
    pBlood = estado({
      li: 70,
      lt: 70,
      slt: 1,
      ap: 0,
      di: 0,
      dt: 0,
      sap: 0.96,
      sdi: 0.96,
      sdt: 1,
      f1: 255,
      f2: 255,
      f3: 255
    });
  }

  if (n === 2) {
    pDNA = estado({
      fr1: 70,
      fr2: 0,
      fr3: 0,
      t1: 0,
      t2: 0,
      t3: 0,
      f1: 255,
      f2: 255,
      f3: 255
    });
  }

  if (n === 3) {
    pPH = estado({
      izq: 70,
      ti: 70,
      td: 70,
      ci: 0,
      cm: 0,
      cs: 0,
      f1: 255,
      f2: 255,
      f3: 255,
      f4: 255,
      f5: 255
    });
  }

  if (n === 4) {
    pFear = {
      activo: [false, false, false],
      img: [70, 70, 70],
      imgT: [70, 70, 70],
      txt: [70, 70, 70],
      txtT: [70, 70, 70],
      esc: [1, 1, 1],
      escT: [1, 1, 1]
    };
  }

  if (n === 5) {
    pDuck = estado({
      t1: 0,
      t2: 0,
      t3: 0,
      t4: 0,
      d1: 0,
      d2: 0,
      d3: 0,
      td: 0,
      boton: 0,
      f1: 255,
      f2: 255,
      f3: 255,
      f4: 255
    });
  }

  if (n === 6) {
    pFinal = estado({
      txt: 0,
      boton: 0,
      flecha: 255
    });
  }
}

function actualizarPagina() {
  if (pagina === 1) animar(pBlood);
  if (pagina === 2) animar(pDNA);
  if (pagina === 3) animar(pPH);
  if (pagina === 5) animar(pDuck);
  if (pagina === 6) animar(pFinal);

  if (pagina === 4) {
    for (let i = 0; i < 3; i++) {
      pFear.img[i] = lerp(pFear.img[i], pFear.imgT[i], 0.08);
      pFear.txt[i] = lerp(pFear.txt[i], pFear.txtT[i], 0.08);
      pFear.esc[i] = lerp(pFear.esc[i], pFear.escT[i], 0.08);
    }
  }
}

function dibujarPagina(n, ox, oy) {
  push();
  translate(ox, oy);

  if (n === 0) paginaIntro();
  if (n === 1) paginaBlood();
  if (n === 2) paginaDNA();
  if (n === 3) paginaPrideHumble();
  if (n === 4) paginaFear();
  if (n === 5) paginaDuckworth();
  if (n === 6) paginaFinal();

  pop();
}

function paginaIntro() {
  fondo();

  let sx = width / 1228;
  let sy = height / 689;

  let bloque = {
    x: 379,
    y: 78,
    w: 470,
    h: 455
  };

  let mouseIcon = {
    x: 93,
    y: 80,
    w: 62,
    h: 62
  };

  let textoMouse = {
    x: 82,
    y: 152,
    w: 210,
    h: 70
  };

  let fArriba = {
    x: 165,
    y: 322,
    w: 62,
    h: 62
  };

  let fIzq = {
    x: 98,
    y: 389,
    w: 62,
    h: 62
  };

  let fAbajo = {
    x: 165,
    y: 389,
    w: 62,
    h: 62
  };

  let fDer = {
    x: 232,
    y: 389,
    w: 62,
    h: 62
  };

  let textoTeclado = {
    x: 82,
    y: 470,
    w: 250,
    h: 80
  };

  let titulo = {
    x: 900,
    y: 78,
    w: 270,
    h: 70
  };

  let textoPrincipal = {
    x: 900,
    y: 151,
    w: 270,
    h: 360
  };

  let switchIntro = {
    x: 1143,
    y: 594,
    w: 71,
    h: 71
  };

  let hoverBloque = encima(bloque, sx, sy);
  let hoverSwitch = encima(switchIntro, sx, sy);
  let hoverMouse = encima(mouseIcon, sx, sy);

  escalaIntro = lerp(
    escalaIntro,
    hoverBloque ? 1.03 : 1,
    0.08
  );

  let intro =
    "DAMN., lanzado en 2017, es un viaje mental por la vida de Kendrick Lamar. El álbum cruza culpa, fe, miedo, orgullo, violencia y destino, como si cada canción abriera una parte distinta de su conciencia.\n\nNo funciona como una historia lineal, sino como una caída emocional. Kendrick observa su pasado, sus impulsos y sus contradicciones para entender qué parte de su vida fue elegida y qué parte ya venía marcada.\n\nTodo comienza con una escena simple, pero fatal.";

  imgCover(
    hoverBloque ? a.damn2 : a.damn1,
    bloque,
    sx,
    sy,
    255,
    escalaIntro
  );

  tituloTxt(
    "DAMN.",
    titulo,
    sx,
    sy
  );

  cajaTexto(
    intro,
    textoPrincipal,
    sx,
    sy,
    255,
    1,
    14,
    18
  );

  cajaTexto(
    "MOUSE\npresiona y revela\nfragmentos ocultos.",
    textoMouse,
    sx,
    sy,
    255,
    1,
    13,
    17
  );

  cajaTexto(
    "TECLADO\nusa las flechas\npara avanzar.",
    textoTeclado,
    sx,
    sy,
    255,
    1,
    13,
    17
  );

  imgEsc(
    a.mouse,
    mouseIcon,
    sx,
    sy,
    255,
    1,
    hoverMouse ? 130 : 255
  );

  imgEsc(
    a.arriba,
    fArriba,
    sx,
    sy,
    255,
    1,
    keyIsDown(UP_ARROW) ? 130 : 255
  );

  imgEsc(
    a.izquierda,
    fIzq,
    sx,
    sy,
    255,
    1,
    keyIsDown(LEFT_ARROW) ? 130 : 255
  );

  imgEsc(
    a.abajo,
    fAbajo,
    sx,
    sy,
    255,
    1,
    keyIsDown(DOWN_ARROW) ? 130 : 255
  );

  imgEsc(
    a.derecha,
    fDer,
    sx,
    sy,
    255,
    1,
    keyIsDown(RIGHT_ARROW) ? 130 : 255
  );

  switchBoton(
    switchIntro,
    sx,
    sy,
    hoverSwitch
  );
}

//pagina 2

function paginaBlood() {
  fondo();

  let sx = width / 817;
  let sy = height / 456;
  let v = pBlood.v;

  let bloqueIzq = {
    x: 45,
    y: 18,
    w: 315,
    h: 220
  };

  let textoIzq = {
    x: 57,
    y: 249,
    w: 291,
    h: 130
  };

  let bloqueDer = {
    x: 527,
    y: 39,
    w: 231,
    h: 287
  };

  let textoDer = {
    x: 526,
    y: 337,
    w: 233,
    h: 42
  };

  let f1 = {
    x: 61,
    y: 395,
    w: 49,
    h: 48
  };

  let f2 = {
    x: 178,
    y: 395,
    w: 49,
    h: 48
  };

  let f3 = {
    x: 296,
    y: 395,
    w: 49,
    h: 48
  };

  let fFinal = {
    x: 760,
    y: 395,
    w: 49,
    h: 48
  };

  let tIzq =
    "BLOOD abre la historia con un gesto de ayuda. Kendrick ve a una mujer ciega en la calle y se acerca, como si intentara hacer algo correcto dentro de un mundo marcado por violencia y juicio. La escena parece simple, pero ya anuncia que la bondad también puede caer bajo el peso del destino.";

  let tDer =
    "La mujer le dispara. La ayuda se vuelve tragedia y Kendrick entra al álbum desde una caída. Antes de explicar quién es, debe enfrentar la fragilidad de existir.";

  imgContain(
    a.kendrickSenora,
    bloqueIzq,
    sx,
    sy,
    v.li,
    1.60
  );

  imgContain(
    a.apuntando,
    bloqueDer,
    sx,
    sy,
    v.ap,
    v.sap
  );

  imgContain(
    a.disparo,
    bloqueDer,
    sx,
    sy,
    v.di,
    v.sdi
  );

  autoTexto(
    tIzq,
    textoIzq,
    sx,
    sy,
    v.lt,
    v.slt,
    9.4,
    12.6
  );

  autoTexto(
    tDer,
    textoDer,
    sx,
    sy,
    v.dt,
    v.sdt,
    8.8,
    10.8
  );

  imgEsc(a.derecha, f1, sx, sy, v.f1, 1);
  imgEsc(a.derecha, f2, sx, sy, v.f2, 1);
  imgEsc(a.arriba, f3, sx, sy, v.f3, 1);
  imgEsc(a.abajo, fFinal, sx, sy, 255, 1);
}


function paginaDNA() {
  fondo();

  let sx = width / 818;
  let sy = height / 460;
  let v = pDNA.v;

  let imgCentral = {
    x: 215,
    y: 73,
    w: 388,
    h: 287
  };

  let fila1 = {
    x: 57,
    y: 51,
    w: 134,
    h: 94
  };

  let fila2 = {
    x: 57,
    y: 158,
    w: 134,
    h: 94
  };

  let fila3 = {
    x: 57,
    y: 265,
    w: 134,
    h: 95
  };

  let f1 = {
    x: 58,
    y: 395,
    w: 49,
    h: 48
  };

  let f2 = {
    x: 176,
    y: 395,
    w: 49,
    h: 48
  };

  let f3 = {
    x: 293,
    y: 395,
    w: 49,
    h: 48
  };

  let fFinal = {
    x: 760,
    y: 395,
    w: 49,
    h: 48
  };

  imgContain(a.sentado1, imgCentral, sx, sy, v.fr1, 1);
  imgContain(a.sentado2, imgCentral, sx, sy, v.fr2, 1);
  imgContain(a.sentado3, imgCentral, sx, sy, v.fr3, 1);

  cajaTexto(
    "DNA aparece como una explosión de identidad. Kendrick habla desde el orgullo, la rabia y la fuerza heredada.",
    fila1,
    sx,
    sy,
    v.t1,
    1,
    8.4,
    11.4
  );

  cajaTexto(
    "Su historia no nace solo de decisiones personales: está hecha de familia, barrio, memoria y heridas.",
    fila2,
    sx,
    sy,
    v.t2,
    1,
    8.4,
    11.4
  );

  cajaTexto(
    "La identidad es poder, pero también carga. Es orgullo, pero también una herida que empuja la historia.",
    fila3,
    sx,
    sy,
    v.t3,
    1,
    8.4,
    11.4
  );

  imgEsc(a.derecha, f1, sx, sy, v.f1, 1);
  imgEsc(a.derecha, f2, sx, sy, v.f2, 1);
  imgEsc(a.derecha, f3, sx, sy, v.f3, 1);
  imgEsc(a.derecha, fFinal, sx, sy, 255, 1);
}


// pagina 4


function paginaPrideHumble() {
  fondo();

  let sx = width / 1228;
  let sy = height / 689;
  let v = pPH.v;

  let bloqueIzq = {
    x: 88,
    y: 48,
    w: 348,
    h: 404
  };

  let textoIzq = {
    x: 88,
    y: 469,
    w: 348,
    h: 88
  };

  let textoDer = {
    x: 791,
    y: 469,
    w: 347,
    h: 88
  };

  let caraInf = {
    x: 760,
    y: 220,
    w: 400,
    h: 255
  };

  let caraMed = {
    x: 800,
    y: 110,
    w: 360,
    h: 290
  };

  let caraSup = {
    x: 805,
    y: 18,
    w: 350,
    h: 285
  };

  let fs = [
    { x: 60, y: 594, w: 71, h: 71 },
    { x: 263, y: 594, w: 71, h: 71 },
    { x: 439, y: 594, w: 71, h: 71 },
    { x: 614, y: 594, w: 71, h: 71 },
    { x: 789, y: 594, w: 71, h: 71 }
  ];

  let fFinal = {
    x: 1143,
    y: 594,
    w: 71,
    h: 71
  };

  let pride =
    "PRIDE muestra a Kendrick mirando hacia adentro. El orgullo aparece como una barrera espiritual: lo protege del mundo, pero también lo aleja de la paz. En esta parte de la historia, el enemigo ya no está solo afuera; está en su ego, en su necesidad de control y en la dificultad de aceptar sus propias fallas.";

  let humble =
    "HUMBLE responde como un intento de corrección. Kendrick intenta bajar la cabeza, reconocer sus límites y desprenderse del ego que lo consume. Pero la canción también es contradictoria: suena fuerte, desafiante y segura, como si incluso su búsqueda de humildad siguiera peleando contra el orgullo.";

  imgContain(a.kendrickMirando, bloqueIzq, sx, sy, v.izq, 1);

  imgContain(a.caraInferior, caraInf, sx, sy, v.ci, 1);
  imgContain(a.caraMedio, caraMed, sx, sy, v.cm, 1);
  imgContain(a.caraSuperior, caraSup, sx, sy, v.cs, 1);

  autoTexto(pride, textoIzq, sx, sy, v.ti, 1, 11.8, 14.2);
  autoTexto(humble, textoDer, sx, sy, v.td, 1, 11.8, 14.2);

  imgEsc(a.derecha, fs[0], sx, sy, v.f1, 1);
  imgEsc(a.derecha, fs[1], sx, sy, v.f2, 1);
  imgEsc(a.arriba, fs[2], sx, sy, v.f3, 1);
  imgEsc(a.arriba, fs[3], sx, sy, v.f4, 1);
  imgEsc(a.arriba, fs[4], sx, sy, v.f5, 1);

  imgEsc(a.abajo, fFinal, sx, sy, 255, 1);
}


// pagina 5


function paginaFear() {
  fondo();

  let sx = width / 818;
  let sy = height / 460;

  let bloques = [
    { x: 78, y: 63, w: 153, h: 246 },
    { x: 332, y: 61, w: 153, h: 247 },
    { x: 584, y: 61, w: 153, h: 247 }
  ];

  let textos = [
    { x: 78, y: 319, w: 153, h: 63 },
    { x: 332, y: 319, w: 153, h: 63 },
    { x: 584, y: 319, w: 153, h: 63 }
  ];

  let switches = [
    { x: 43, y: 181, w: 25, h: 32 },
    { x: 298, y: 178, w: 25, h: 32 },
    { x: 550, y: 178, w: 25, h: 33 }
  ];

  let mouses = [
    { x: 32, y: 214, w: 24, h: 24 },
    { x: 287, y: 213, w: 24, h: 24 },
    { x: 539, y: 213, w: 24, h: 24 }
  ];

  let flechaFinal = {
    x: 760,
    y: 396,
    w: 49,
    h: 49
  };

  let imagenes = [
    a.baby,
    a.mediano,
    a.tercero
  ];

  let parrafos = [
    "El miedo aparece primero como infancia. Es el temor al castigo, a equivocarse, a no entender completamente el mundo adulto. Kendrick muestra cómo el miedo puede instalarse temprano, antes incluso de tener palabras para explicarlo.",
    "Luego el miedo cambia de forma. En la juventud ya no se trata solo de obedecer, sino de sobrevivir. La calle, la violencia y la presión convierten cada decisión en una amenaza. Crecer significa aprender que cualquier error puede cambiar el destino.",
    "En el presente, el miedo se vuelve más interno. Kendrick teme perder lo que construyó, fallar espiritualmente o repetir los mismos patrones que lo formaron. El miedo ya no viene solo desde afuera: vive dentro de él."
  ];

  for (let i = 0; i < 3; i++) {
    imgContain(imagenes[i], bloques[i], sx, sy, pFear.img[i], pFear.esc[i]);
    autoTexto(parrafos[i], textos[i], sx, sy, pFear.txt[i], pFear.esc[i], 8.0, 9.2);
    dibujarSwitch(switches[i], sx, sy, pFear.activo[i]);
    imgEsc(a.mouse, mouses[i], sx, sy, 220, 1);
  }

  imgEsc(a.abajo, flechaFinal, sx, sy, 255, 1);
}

//pagina 6

function paginaDuckworth() {
  fondo();

  let sx = width / 818;
  let sy = height / 460;
  let v = pDuck.v;

  let imgCentral = {
    x: 233,
    y: 38,
    w: 350,
    h: 335
  };

  let ps = [
    { x: 57, y: 38, w: 143, h: 74 },
    { x: 57, y: 125, w: 143, h: 74 },
    { x: 57, y: 212, w: 143, h: 74 },
    { x: 57, y: 299, w: 143, h: 74 }
  ];

  let textoDer = {
    x: 613,
    y: 218,
    w: 147,
    h: 101
  };

  let boton = {
    x: 613,
    y: 330,
    w: 147,
    h: 42
  };

  let fs = [
    { x: 57, y: 397, w: 49, h: 48 },
    { x: 175, y: 397, w: 49, h: 48 },
    { x: 292, y: 397, w: 49, h: 48 },
    { x: 409, y: 397, w: 49, h: 48 }
  ];

  let textos = [
    "DUCKWORTH revela el origen oculto de la historia. Antes de Kendrick, hubo un cruce entre su padre Ducky y Anthony “Top Dawg” Tiffith.",
    "Ducky trabajaba en un local de comida y decidió tratar a Top Dawg con respeto. Ese gesto cotidiano evitó que el conflicto creciera.",
    "Si Top Dawg hubiera atacado a Ducky, la vida de Kendrick habría cambiado por completo. El álbum muestra que el destino puede depender de una decisión mínima.",
    "La canción cierra el relato como una revelación circular. Kendrick existe porque alguien eligió no destruir. La historia puede volver al comienzo."
  ];

  imgContain(a.ducky1, imgCentral, sx, sy, v.d1, 1);
  imgContain(a.ducky2, imgCentral, sx, sy, v.d2, 1);
  imgContain(a.ducky3, imgCentral, sx, sy, v.d3, 1);

  autoTexto(textos[0], ps[0], sx, sy, v.t1, 1, 8.2, 10.4);
  autoTexto(textos[1], ps[1], sx, sy, v.t2, 1, 8.2, 10.4);
  autoTexto(textos[2], ps[2], sx, sy, v.t3, 1, 8.2, 10.4);
  autoTexto(textos[3], ps[3], sx, sy, v.t4, 1, 8.2, 10.4);

  autoTexto(
    "La vida de Kendrick nace de un instante donde la violencia pudo imponerse, pero no lo hizo.",
    textoDer,
    sx,
    sy,
    v.td,
    1,
    10.5,
    13
  );

  botonTexto(
    "REBOBINAR",
    boton,
    sx,
    sy,
    v.boton,
    1,
    13.8
  );

  imgEsc(a.derecha, fs[0], sx, sy, v.f1, 1);
  imgEsc(a.abajo, fs[1], sx, sy, v.f2, 1);
  imgEsc(a.abajo, fs[2], sx, sy, v.f3, 1);
  imgEsc(a.abajo, fs[3], sx, sy, v.f4, 1);
}

//pagina 7

function paginaFinal() {
  fondo();

  let sx = width / 617;
  let sy = height / 314;
  let v = pFinal.v;

  let zonaImagen = {
    x: 150,
    y: 65,
    w: 320,
    h: 185
  };

  let texto = {
    x: 441,
    y: 36,
    w: 130,
    h: 161
  };

  let boton = {
    x: 441,
    y: 211,
    w: 130,
    h: 36
  };

  let flecha = {
    x: 58,
    y: 245,
    w: 42,
    h: 42
  };

  let textoFinal =
    "Escuchar DAMN. al revés cambia el sentido completo del viaje. En vez de comenzar con una muerte, la historia parte con DUCKWORTH, desde el azar que permitió la existencia de Kendrick. Primero aparece el origen, luego el miedo, después la lucha entre humildad y orgullo, más tarde la identidad, y finalmente BLOOD como caída. Al invertir el orden, el álbum deja de sentirse solo como una condena y se transforma en una pregunta circular: si el destino puede salvar una vida, también puede devolverla al mismo punto. La historia termina, pero al revés parece comenzar de nuevo.";

  imgContain(a.dead, zonaImagen, sx, sy, 255, 1);

  autoTexto(
    textoFinal,
    texto,
    sx,
    sy,
    v.txt,
    1,
    7.2,
    8.2
  );

  botonTexto(
    "VOLVER A EMPEZAR",
    boton,
    sx,
    sy,
    v.boton,
    1,
    7.8
  );

  imgEsc(a.derecha, flecha, sx, sy, v.flecha, 1);
}

// modos de imagen y configuracion de imagenes 

function fondo() {
  noStroke();
  fill(0);
  rect(0, 0, width, height);
}

function imgEsc(img, obj, sx, sy, alpha, escala, brillo) {
  if (!img || alpha < 1) return;

  if (brillo === undefined) {
    brillo = 255;
  }

  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  push();
  translate(x + w / 2, y + h / 2);
  scale(escala);
  imageMode(CENTER);
  tint(brillo, alpha);
  image(img, 0, 0, w, h);
  noTint();
  pop();
}

function imgContain(img, obj, sx, sy, alpha, escala) {
  if (!img || alpha < 1) return;

  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  let rImg = img.width / img.height;
  let rBox = w / h;

  let dw = w;
  let dh = h;

  if (rImg > rBox) {
    dh = w / rImg;
  } else {
    dw = h * rImg;
  }

  push();
  translate(x + w / 2, y + h / 2);
  scale(escala);
  imageMode(CENTER);
  tint(255, alpha);
  image(img, 0, 0, dw, dh);
  noTint();
  pop();
}

function imgCover(img, obj, sx, sy, alpha, escala) {
  if (!img || alpha < 1) return;

  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  let rImg = img.width / img.height;
  let rBox = w / h;

  let sxImg = 0;
  let syImg = 0;
  let swImg = img.width;
  let shImg = img.height;

  if (rImg > rBox) {
    swImg = img.height * rBox;
    sxImg = (img.width - swImg) / 2;
  } else {
    shImg = img.width / rBox;
    syImg = (img.height - shImg) / 2;
  }

  push();
  translate(x + w / 2, y + h / 2);
  scale(escala);
  imageMode(CENTER);
  tint(255, alpha);
  image(img, 0, 0, w, h, sxImg, syImg, swImg, shImg);
  noTint();
  pop();
}

function tituloTxt(txt, obj, sx, sy) {
  push();
  fill(255);
  textAlign(LEFT, TOP);
  textFont("Impact");
  textSize(62 * sx);
  text(txt, obj.x * sx, obj.y * sy);
  pop();
}

function cajaTexto(txt, obj, sx, sy, alpha, escala, tam, lead) {
  if (alpha < 1) return;

  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  push();
  translate(x + w / 2, y + h / 2);
  scale(escala);
  fill(255, alpha);
  textAlign(LEFT, TOP);
  textFont("Times New Roman");
  textSize(tam * sx);
  textLeading(lead * sy);
  text(txt, -w / 2, -h / 2, w, h);
  pop();
}

function autoTexto(txt, obj, sx, sy, alpha, escala, tamMax, leadMax) {
  if (alpha < 1) return;

  let tam = tamMax;
  let lead = leadMax;
  let w = obj.w * sx;
  let h = obj.h * sy;

  textFont("Times New Roman");

  while (tam > 3.2) {
    textSize(tam * sx);
    textLeading(lead * sy);

    let lineas = dividirLineas(txt, w);
    let alto = lineas.length * lead * sy;

    if (alto <= h) {
      break;
    }

    tam -= 0.2;
    lead -= 0.22;
  }

  cajaTexto(txt, obj, sx, sy, alpha, escala, tam, lead);
}

function dividirLineas(txt, ancho) {
  let palabras = txt.split(" ");
  let lineas = [];
  let linea = "";

  for (let i = 0; i < palabras.length; i++) {
    let prueba = linea + palabras[i] + " ";

    if (textWidth(prueba) > ancho && linea.length > 0) {
      lineas.push(linea.trim());
      linea = palabras[i] + " ";
    } else {
      linea = prueba;
    }
  }

  lineas.push(linea.trim());
  return lineas;
}

function dibujarSwitch(obj, sx, sy, activo) {
  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  noStroke();
  fill(255, activo ? 230 : 120);
  rect(x, y, w, h);
}

function switchBoton(obj, sx, sy, hover) {
  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  push();

  noStroke();
  fill(255, hover ? 230 : 150);
  rect(x, y, w, h);

  fill(0, hover ? 230 : 180);
  textAlign(CENTER, CENTER);
  textFont("Arial");
  textStyle(BOLD);
  textSize(12 * sx);
  text("ON", x + w / 2, y + h / 2);

  textStyle(NORMAL);

  pop();
}

function botonTexto(txt, obj, sx, sy, alpha, escala, tam) {
  if (alpha < 1) return;

  let x = obj.x * sx;
  let y = obj.y * sy;
  let w = obj.w * sx;
  let h = obj.h * sy;

  let hover =
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h;

  push();

  translate(x + w / 2, y + h / 2);
  scale(escala);

  textAlign(CENTER, CENTER);
  textFont("Arial");
  textStyle(BOLD);
  textSize(tam * sx);

  fill(hover ? 255 : 210, alpha);
  text(txt, 0, 0);

  textStyle(NORMAL);

  pop();
}

function encima(obj, sx, sy) {
  return (
    mouseX > obj.x * sx &&
    mouseX < (obj.x + obj.w) * sx &&
    mouseY > obj.y * sy &&
    mouseY < (obj.y + obj.h) * sy
  );
}