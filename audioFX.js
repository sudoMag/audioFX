
function createAnalyser(audio) {
    console.log('keloke');
    const context = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = context.createAnalyser();
    let source = context.createMediaStreamSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    console.log(context.destination);
    return analyser;
}

const audio = document.querySelector('audio');

function toDraw(analyser) {

    const Box = document.querySelector('.audio-box');
    //const textVibration = document.querySelector('.text-vibration');
    //const imgVibration= document.querySelector('.img-vibration');
    // Head = document.querySelector('.audio-aura');
    var vibrationAxis = '';
    var audioAnimations = null;
    
    function frame () {
        
        audioAnimations = requestAnimationFrame(frame);
        var AudioPiece = analyser.frequencyBinCount;
        let pieceFrequenciesArray = new Uint8Array(AudioPiece);

        analyser.getByteFrequencyData(pieceFrequenciesArray);
        //console.log(fbc_array);
        var arraySum = 0;
        var bassRange = pieceFrequenciesArray.slice(0, 5);
        
        for(let number of bassRange) {
            arraySum += number;
        }

        var promedy = arraySum / 5;
        var porcent = (promedy / 255);
       

        if (vibrationAxis === '') {
            vibrationAxis = '-'
        } else if (vibrationAxis === '-') {
            vibrationAxis = '';
        }
        

        function boxScaleSizeAndVibration () {
            let size = 1 + (porcent * 0.3); 
            if (size <= 1.23) {
                if (size <= 1.12) {
                    return (`scale(${size})`);
                }

                return (`scale(${size -= 0.1})`);
            }else {
                return (`scale(${size}) translate(${vibrationAxis}5%)`);
            }
        }

        function objectVibration () {
            let size = 1 + (porcent * 0.3); 
            if (size > 1.28) {
                return (`translate(${vibrationAxis}0.4%)`);
            }
            return ('none');
        }

        function backgroundFlash () {
            let size = 1 + (porcent * 0.3); 
            if (size <= 1.28) {
                return ('#171717');
            }
            return ('#2f2f2f');
        }
            

        Box.style.transform = boxScaleSizeAndVibration();
        Box.style.transitionDuration = '0.08s';
        //textVibration.style.transform = objectVibration();
        //imgVibration.style.transform = objectVibration();
        //Head.style.backgroundColor = backgroundFlash();
    }
    frame();
}