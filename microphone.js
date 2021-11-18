function microfono(){
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia);

    if(navigator.getUserMedia){  
    //como deseamos tener activado tanto audio, video, los ponemos en true,
    //el segundo parámetro será una función a la cual le pondremos videocam como parámetro, el cual recibe el video a visualizar
        navigator.getUserMedia(
            {
                audio:true
            }, 
            (stream) => {  
            const analyser = createAnalyser(stream);
            toDraw(analyser);
            //iniciamos la webcam de nuestro pc
        },
        e => {
            console.log(e)
        });
    }
}
const ball = document.querySelector('#circle');
ball.addEventListener('click', microfono);