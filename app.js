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

    var squares = [
        {
            x:100,
            y:30,
            width:50,
            height:50,
            hit:false
        },
        {
            x:160,
            y:30,
            width:50,
            height:50,
            hit:false
        },
        {
            x:220,
            y:30,
            width:50,
            height:50,
            hit:false
        }
        ,
        {
            x:280,
            y:30,
            width:50,
            height:50,
            hit:false
        }
        ,
        {
            x:340,
            y:30,
            width:50,
            height:50,
            hit:false
        }
        ,
        {
            x:400,
            y:30,
            width:50,
            height:50,
            hit:false
        },


        
        {
            x:160,
            y:90,
            width:50,
            height:50,
            hit:false
        },
        {
            x:220,
            y:90,
            width:50,
            height:50,
            hit:false
        }
        ,
        {
            x:280,
            y:90,
            width:50,
            height:50,
            hit:false
        }
        ,
        {
            x:340,
            y:90,
            width:50,
            height:50,
            hit:false
        }
        
    ]

    function renderCanvas(){
        ctx.fillStyle = "#130f40";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
    function renderPlayer(){
        ctx.fillStyle = "#4834d4";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function renderBullet(i){
        ctx.fillStyle = "#ff7979";
        if(bullets.length>0){
            ctx.fillRect(bullets[i].x, bullets[i].y, bullet.width, bullet.height);
        }
    }

    function renderSquare(){
        ctx.fillStyle = "#7ed6df";
        for(let i = 0; i < squares.length; i++){
            ctx.fillRect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
        }

    }
    let i = 0;
    function update(){
        renderCanvas();
        renderPlayer();

        if(player.x < 0) player.x = 0;
        if(player.x >= canvas.width - player.width) player.x = canvas.width - player.width;
        for(let i = 0 ; i  < bullets.length; i++){
            renderBullet(i);
            bullets[i].y -=20;
        }
        renderSquare();
        checkCollision();
        checkGame();
       
    }


    function checkCollision(){
        let collision = false;
        for(let i = 0 ; i < bullets.length;i++){
            for(let j = 0; j < squares.length; j++){
                let bltLeft = bullets[i].x;
                let bltRight = (bullets[i].x+bullets[i].width);
                let sqrLeft = squares[j].x ;
                let sqrRight = (squares[j].x+squares[j].width);

                if( ((bltLeft<=sqrRight && bltLeft>= sqrLeft) || (bltRight>= sqrLeft && bltRight <= sqrRight)) &&
                    bullets[i].y <= squares[j].y + squares[j].height -5 && bullets[i].y >=squares[j].y ){

                    collision = true;
                    bullets.splice(i,1);
                    squares.splice(j,1);
                    break;
                }
                if(bullets[i].y < 0) bullets.splice(i,1);
            }
            if(collision) break;
        }
    }
    let interval = setInterval(update,24);

    function checkGame(){
        if(squares.length === 0){
            clearInterval(interval);
            clearInterval(interval2);
            alert("GAME OVER");
        }
    }
    let right = true;
    function moveSquares(){
        if(right){
            if(squares.length > 0 && squares[squares.length - 1].x >= 900){
                right = false;
            }
        }
        else if(squares.length >0 && squares[0].x <= 100){
            right = true;
        }
        for(let i = 0 ; i < squares.length; i++){

            if(right){
                squares[i].x += 30;
            }

            if(!right){
                squares[i].x -= 30;
            }
        }
    }
    let interval2 = setInterval(moveSquares, 200);



    document.addEventListener('keydown', (e)=>{
        if(e.key === "ArrowLeft"){
            player.x -= 30;
            
        }
        else if(e.key === "ArrowRight"){
            player.x += 30;
        }
        else if(e.key === " "){
            bullets.push({
                x:player.x - 10 + player.width/2,
                y:player.y,
                height: 20,
                width:20
            });

        }
    })


});