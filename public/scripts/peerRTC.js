console.log('peerRTC.js connected')
let audio;
navigator.mediaDevices.getUserMedia({audio:true, video:false})
.then(function (stream) {
  audio = stream;
  return socket.emit('sendVoice', audio});
})
.catch( err => console.error(err))


// const host = new PeerConnection('http://XXX.XXX.X.XXX:3000');
// console.log(host);
//
// host.onStreamAdded = function(e) {
//   console.log('getting in here')
//   document.body.appendChild(e.mediaElement);
// };
//
//
// const stranger = new PeerConnection('http://XXX.XXX.X.XXX:3000');
// stranger.onStreamAdded = function(e) {
//   document.body.appendChild(e.mediaElement);
// };
// stranger.startBroadcasting('host');
