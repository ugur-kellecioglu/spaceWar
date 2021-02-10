document.addEventListener('DOMContentLoaded',()=>{
    var canvas = document.getElementById('canvas');
    canvas.width = 1000;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');
    var playerHeight = 40;
    var playerWidth = 100;

    var player = {
        height: playerHeight,
        width: playerWidth,
        x:(canvas.width-playerWidth)/2,
        y:canvas.height-playerHeight - 50
    }
    function renderCanvas(){
        ctx.fillStyle = "green";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
    function renderPlayer(){
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function update(){
        renderCanvas();
        renderPlayer();

        if(player.x < 0) player.x = 0;
        if(player.x >= canvas.width - player.width) player.x = canvas.width - player.width;
  

    }

    let interval = setInterval(update,10);

    document.addEventListener('keydown', (e)=>{
        if(e.key === "ArrowLeft"){
            player.x -= 20;
        }
        else if(e.key === "ArrowRight"){
            player.x += 20;
        }
        else if(e.key === " "){
            let bullet = document.createElement('div');
            bullet.className = "bullet";
            canvas.appendChild(bullet);
        }
    })


});