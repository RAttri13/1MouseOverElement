// (function() {
  
   
//     var factor = 1 / 5;
//     var timeOld, timeElapsed;
//     var x = 10;
//     var y = 10;
//     var step = 1;
//     var dx = step;
//     var dy = step;
//     var width = ball.offsetWidth;
//     var height = ball.offsetHeight;
//     var cH = container.offsetHeight;
//     var cW = container.offsetWidth;
//     console.log(width,cW)
    
//     function movement() {
//       requestAnimationFrame(moveball);
  
//       function checkBall() {
//         if (x + width >= cW) dx = -step;
//         if (x <= 0) dx = step;
//         if (y + height >= cH) dy = -step;
//         if (y <= 0) dy = step;
//       }
  
//       function moveball(timestamp) {
//         if (!timeOld) timeOld = timestamp;
//         timeElapsed = timestamp - timeOld;
//         timeOld = timestamp;
  
//         x += dx * timeElapsed * factor;
//         y += dy * timeElapsed * factor;
//         ball.style.transform = "translate(" + x + "px, " + y + "px)";
  
//         checkBall();
//         requestAnimationFrame(moveball);
//       }
//     }
    
//     btn.addEventListener('click', movement)
//   })();