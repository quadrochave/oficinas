window.onload = function() {

	var Q = Quintus()
            .include("Sprites, Scenes, Input, 2D, Touch, UI")
            .setup({
                width: 960,
                height: 640,
		maximize: true
         }).controls().touch();            
        
      
        //player
        Q.Sprite.extend("Player",{
            init: function(p) {
              this._super(p, { asset: "tux_01.png", x: 300, y: 200, jumpSpeed: -380});
              this.add('2d, platformerControls');              
            },
            step: function(dt) {
                if(Q.inputs['left'] ) {
                    this.p.flip = 'x';
                } 
                if(Q.inputs['right'] ) {
                    this.p.flip = false;                    
                }

            }                    
          });

	//inimigo em movimento horizontal          
	 Q.Sprite.extend("GroundEnemy", {
	    init: function(p) {
		this._super(p, {asset: "slime.png", x: 200, y: 400, vx: -60, defaultDirection: "left"});
		this.add("2d, aiBounce");
		
		this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision) {
		    if(collision.obj.isA("Player")) { 
		      Q.stageScene("endGame",1, { label: "Game Over" }); 
		      collision.obj.destroy();
		    }
		});
		
	    },
	    step: function(dt) {
		
	    }
	});

	Q.Sprite.extend("Pergunta1", {
	    init: function(p) {
		this._super(p, {asset: "pergunta1.png", x: 550, y: 400});
	    }            
	});

	Q.Sprite.extend("RespostaNao", {
	    init: function(p) {
		this._super(p, {asset: "resposta_nao.png", gravity: 0, x: 590, y: 510,});
		this.add("2d")
		this.on("bump.bottom",function(collision) {
		    if(collision.obj.isA("Player")) { 
		      
		    }
		});
	    }            
	});

	Q.Sprite.extend("RespostaSim", {
	    init: function(p) {
		this._super(p, {asset: "resposta_sim.png", gravity: 0, x: 500, y: 510,});
		this.add("2d")
		this.on("bump.bottom",function(collision) {
		    if(collision.obj.isA("Player")) { 
		      this.p.gravity = 9

		    }

		});

		this.on("bump.left",function(collision) {

		    if(collision.obj.isA("GroundEnemy")) { 
			collision.obj.destroy();
		    }
		});
	    }            
	});


                       
        
         Q.scene("level1",function(stage) {
          
	    //stage.insert(new Q.Repeater({ asset: "background_0.png", speedX: 0.5, speedY: 0.5 }) );
            
            stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level1.tmx', layerIndex:1,  sheet: 'tiles', tileW: 48, tileH: 48 }));
          
            var player = new Q.Player();
	    stage.insert(player);

	    stage.insert(new Q.GroundEnemy());

	    stage.insert(new Q.Pergunta1());

	    stage.insert(new Q.RespostaSim());

	    stage.insert(new Q.RespostaNao());
            
            stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, minY: 0, });
          
        });

 	Q.scene("endGame",function(stage) {
            alert("game over");
            Q.stageScene('level1');
        });

        
        //load assets
        Q.load("plataformas.png, tux_01.png, slime.png, background_0.png, pergunta1.png, resposta_sim.png, resposta_nao.png, level1.tmx", function() {
          Q.sheet("tiles","plataformas.png", { tilew: 48, tileh: 48});          
          Q.stageScene("level1");
        });

}
