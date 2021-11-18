function newWave () {
    const circle = document.querySelector('#circle');
    circle.innerHTML += `
        <wave-circle id="wave-circle"/>
    `;
}

class WaveCircle extends HTMLElement {
    constructor () {
        super()
    }
}