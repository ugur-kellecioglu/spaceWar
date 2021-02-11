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

    var bullet = {
        x:player.x - 10 + player.width/2,
        y:player.y,
        height: 20,
        width:20
    }

    var bullets = []


    function renderCanvas(){
        ctx.fillStyle = "green";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
    function renderPlayer(){
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function renderBullet(i){
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullets[i].x, bullets[i].y, bullet.width, bullet.height);
    }
    function update(){
        renderCanvas();
        renderPlayer();

        if(player.x < 0) player.x = 0;
        if(player.x >= canvas.width - player.width) player.x = canvas.width - player.width;
        for(let i = 0 ; i  < bullets.length; i++){
            renderBullet(i);
            bullets[i].y -=10;
        }
    }

    function moveBullet(){
        bullet.x += 10;
    }

    let interval = setInterval(update,1000);

    document.addEventListener('keydown', (e)=>{
        if(e.key === "ArrowLeft"){
            player.x -= 20;
            
        }
        else if(e.key === "ArrowRight"){
            player.x += 20;
        }
        else if(e.key === " "){
            bullets.push({
                x:player.x - 10 + player.width/2,
                y:player.y,
                height: 20,
                width:20
            });
            console.log(player.x);
            console.log(bullets);
        }
    })


});