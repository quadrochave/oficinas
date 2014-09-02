
	var Q = Quintus() 
            .include()
            .setup();            
        
      
        Q.Sprite.extend("Player",{
            
            init: function(p) { 
            },
            step: function(dt) {  
            }                    
          });
                       
        Q.scene("level1",function(stage) {
	    
            var background = new Q.TileLayer();
            stage.insert(background);
            
            stage.collisionLayer(new Q.TileLayer());

	    var player = new Q.Player();
	    stage.insert(player);
            
            stage.add("viewport").follow(player);
          
        });
        
        
        //load assets
        Q.load("", function() {
          Q.sheet("", { });          
          Q.stageScene("level1");
        });
