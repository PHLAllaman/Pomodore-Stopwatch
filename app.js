const $state = document.querySelector('.state')
const $screen = document.querySelector('.screen')
const $start = document.querySelectorAll('.btn')[0]
const $reset = document.querySelectorAll('.btn')[1]
const $cicle = document.querySelector('.cicles')
const $bar = document.querySelector('.progress-bar')

const TEMPO_FOCO = 1500
const TEMPO_DESCANSO = 300

let segundos = TEMPO_FOCO
let modo = 'foco'
let setTime = null
let iniciado = false
let ciclos = 0
const TOTAL_CICLOS = 4

function formatScreen(segundos) {
    const minutes = Math.floor(segundos / 60)
    const seconds = segundos % 60

    const m = String(minutes).padStart(2, "0")
    const s = String(seconds).padStart(2, "0")

    return `${m}:${s}`
}

function atualizarTela() {
    $screen.textContent = formatScreen(segundos)

    const tempoTotal = modo === 'foco'
        ? TEMPO_FOCO
        : TEMPO_DESCANSO

    const progresso =
        ((tempoTotal - segundos) / tempoTotal) * 100

    $bar.style.width = `${progresso}%`

    $state.textContent =
        modo === 'foco' ? 'Foco' : 'Descanso'

    $cicle.textContent =
        `Cicle ${ciclos} of ${TOTAL_CICLOS}`
}

function mudarEtapa() {
    if (modo === 'foco') {
        modo = 'descanso'
        segundos = TEMPO_DESCANSO
    } else {
        ciclos++

        if (ciclos >= TOTAL_CICLOS) {
            pause()
            $state.textContent = 'Concluído'
            $screen.textContent = '00:00'
            return
        }

        modo = 'foco'
        segundos = TEMPO_FOCO
    }

    atualizarTela()
}

function decreaseSeconds() {
    if (segundos > 0) {
        segundos--
        atualizarTela()
    }

    if (segundos === 0) {
        mudarEtapa()
    }
}

function start() {
    if (iniciado) return

    iniciado = true
    $start.textContent = 'Stop'

    setTime = setInterval(decreaseSeconds, 1000)
}

function pause() {
    clearInterval(setTime)
    setTime = null
    iniciado = false
    $start.textContent = 'Start'
}

$start.addEventListener('click', () => {
    if (iniciado) {
        pause()
    } else {
        start()
    }
})

$reset.addEventListener('click', () => {
    pause()

    modo = 'foco'
    segundos = TEMPO_FOCO
    ciclos = 0

    atualizarTela()
})

atualizarTela()







