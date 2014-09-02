window.onload = function() {

	var Q = Quintus()
            .include("Sprites, Scenes, Input, 2D, Touch, UI")
            .setup({
                width: 960,
                height: 640,
         }).controls().touch();            
        
      
        //player
        Q.Sprite.extend("Player",{
            init: function(p) {
              this._super(p, { asset: "tux_01.png", x: 180, y: 200, jumpSpeed: -380});
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
		this._super(p, {vx: -100, defaultDirection: "left"});
		this.add("2d, aiBounce");
		
		this.on("bump.left,bump.right,bump.bottom",function(collision) {
		    if(collision.obj.isA("Player")) { 
		      Q.stageScene("endGame",1, { label: "Game Over" }); 
		      collision.obj.destroy();
		    }
		});
		this.on("bump.top",function(collision) {
		    if(collision.obj.isA("Player")) { 
		        
		        
		    }
		});
	    },
	    step: function(dt) {
		
	    }
	});
                       
        
        Q.scene("level1",function(stage) {
          
	    //stage.insert(new Q.Repeater({ asset: "background_0.png", speedX: 0.5, speedY: 0.5 }) );
            
            stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level1.tmx', layerIndex:1,  sheet: 'tiles', tileW: 48, tileH: 48 }));
          
            var player = new Q.Player();
	    stage.insert(player);

	    stage.insert(new Q.GroundEnemy({x: 10*48, y: 500, asset: "slime.png"}));
            
            stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, minY: 0, });
          
        });
        
        
        //load assets
        Q.load("plataformas.png, tux_01.png, slime.png, background_0.png, level1.tmx", function() {
          Q.sheet("tiles","plataformas.png", { tilew: 48, tileh: 48});          
          Q.stageScene("level1");
        });

}
