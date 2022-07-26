 // var canvas = document.getElementById("myCanvas");

 const canvas = document.getElementById('drawing-board');
 const toolbar = document.getElementById('toolbar');
 const ctx = canvas.getContext('2d');

 const canvasOffsetX = canvas.offsetLeft;
 const canvasOffsetY = canvas.offsetTop;

 canvas.width = 1800;
 canvas.height = 218;

 let isPainting = false;
 let lineWidth = 5;
 let startX;
 let startY;
 ctx.strokeStyle = '#000';
 lineWidth = 5;


 const draw = (e) => {
     if(!isPainting) {
         return;
     }

     ctx.lineWidth = lineWidth;
     ctx.lineCap = 'round';

     ctx.lineTo(e.clientX, e.clientY-710);
     ctx.stroke();
 }

 canvas.addEventListener('mousedown', (e) => {
     isPainting = true;
     startX = e.clientX;
     startY = e.clientY;
 });

 canvas.addEventListener('mouseup', e => {
     isPainting = false;
     ctx.stroke();
     ctx.beginPath();
 });

 canvas.addEventListener('mousemove', draw);

 //function toggleDraw() set section #chatbot  pointer-events:none;
 function ToggleDraw() {
     var chatbot = document.getElementById("chatbox");
     chatbot.style.pointerEvents = chatbot.style.pointerEvents == "none" ? "auto" : "none";
 }

