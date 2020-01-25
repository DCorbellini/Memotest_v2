let primerCuadro = null
const $tablero = document.querySelector("#tablero")
const $cuadros = $tablero.querySelectorAll(".cuadro")
const $win = document.querySelector('#win')
const coloresBase = ["rojo", "verde", 'azul', 'amarillo', 'rosa', 'naranja']
colores = coloresBase.concat(coloresBase)

manejarColores()
function manejarColores() {
    colores.sort(function () {
        return 0.5 - Math.random()
    })

    colores.forEach(function (color, i) {
        $cuadros[i].classList.add(color)
    })
}

$tablero.onclick = function (e) {
    const $elemento = e.target
    if ($elemento.classList.contains("cuadro")) {
        manejarClickCuadro($elemento)
    }
}

function manejarClickCuadro(cuadroActual) {
    if (primerCuadro === null) {
        primerCuadro = cuadroActual;
        mostrarCuadro(cuadroActual)
    } else {
        if (primerCuadro === cuadroActual) {
            return;
        }
        mostrarCuadro(cuadroActual)
        if (comprobarSonIguales(primerCuadro, cuadroActual)) {
            eliminarCuadro(primerCuadro)
            eliminarCuadro(cuadroActual)
        } else {
            ocultarCuadro(primerCuadro)
            ocultarCuadro(cuadroActual)
        }

        primerCuadro = null;
    }
}

function mostrarCuadro(cuadro) {
    cuadro.style.opacity = '1'
}

function comprobarSonIguales(primerCuadro, segundoCuadro) {
    return primerCuadro.className === segundoCuadro.className
}

function ocultarCuadro(cuadro) {
    setTimeout(function () {
        cuadro.style.opacity = '0'
    }, 400)
}
function eliminarCuadro(cuadro) {
    setTimeout(function () {
        cuadro.parentElement.classList.add('blanco')
        cuadro.remove()
        comprobarFin()
    }, 400)
}

function comprobarFin() {
    const $cuadros = $tablero.querySelectorAll(".cuadro")
    console.log($cuadros.length)
    if ($cuadros.length === 0) {
        $win.style.display = 'block'
        $tablero.style.display = 'none'
    }
}