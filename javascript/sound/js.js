$(document).ready(function(){
	
	navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia);
	

if (!navigator.getUserMedia) {
    return;
}

$(".btn").click(function(){
	startWebcam();
});

function startWebcam(e) {
	
    navigator.getUserMedia({
        audio: true
    }, onSuccess, onError);

    function onSuccess(stream) {

        if (window.URL) {
            $(".webcam")[0].src = window.URL.createObjectURL(stream);
        } else {
            $(".webcam")[0].src = stream;
        }

        $(".webcam")[0].autoplay = true;
        //or video.play();
    }

    function onError() {	}
}
	
	
	
	
	
	
	
});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	