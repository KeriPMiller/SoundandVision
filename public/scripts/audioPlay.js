const audio = document.querySelector('audio');
// get audio
navigator.mediaDevices.getUserMedia({audio: true, video: false})
.then(stream => {
  const audioTracks = stream.getAudioTracks();
  console.log(audio)

  stream.oninactive = () => console.log('end');
  window.stream = stream;
  audio.srcObject = stream;
})
.catch(err => console.error(err))
console.log('audio var: ', audio);
