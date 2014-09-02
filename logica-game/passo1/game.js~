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
              this._super(p, { asset: "tux_01.png", x: 110, y: 200, jumpSpeed: -380});
                       
            },
            step: function(dt) {
                if(Q.inputs['left'] ) {
                    
                } 
                if(Q.inputs['right'] ) {
                    
		                       
                }
            }                    
          });
                       
        
        Q.scene("level1",function(stage) {
          
            
            stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level1.tmx', layerIndex:1,  sheet: 'tiles', tileW: 48, tileH: 48 }));
          
            var player = new Q.Player();
	    stage.insert(player);
            
          
        });
        
        
        //load assets
        Q.load("plataformas.png, tux_01.png, background_0.png, level1.tmx", function() {
          Q.sheet("tiles","plataformas.png", { tilew: 48, tileh: 48});          
          Q.stageScene("level1");
        });

}
