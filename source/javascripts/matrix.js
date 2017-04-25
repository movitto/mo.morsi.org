var font_size = 10;
var drops     = [];
var chars     = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑".split("");
var msgs      = [];

function rand_color(){
  return shuffle(["#CB3301", "#FF0066", "#FF6666", "#FEFF99",
                  "#FFFF67", "#CCFF66", "#99FE00", "#EC8EED",
                  "#FF99CB", "#FE349A", "#CC99FE", "#6599FF",
                  "#03CDFF", "#FFFFFF"])[0];
}

function output_dom(){
  return $("#matrix_output")[0];
}

function context_2d(){
  return output_dom().getContext("2d");
}

function resize(){
  /// making the canvas full screen
  output_dom().height = window.innerHeight;
  output_dom().width  = window.innerWidth;
}

function init(){
  var columns = output_dom().width/font_size; /// number of columns for the rain

  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for(var x = 0; x < columns; x++)
    drops[x] = {x: x, y: 1, event: null};
}

//drawing the characters
function draw()
{
  var out = output_dom();
  var ctx = context_2d();

	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, out.width, out.height);

	ctx.font = font_size + "px arial";

	//looping over drops
	for(var i = 0; i < drops.length; i++){
	  ctx.fillStyle = drops[i].event == null ? "#0F0" : drops[i].event.color;

		var text = chars[Math.floor(Math.random()*chars.length)];

		//x = i*font_size, y = value of drops[i].y*font_size
		ctx.fillText(text, i*font_size, drops[i].y*font_size);

		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i].y*font_size > out.height && Math.random() > 0.975){
			drops[i].y = 0;
      drops[i].event = null;
    }

		//incrementing Y coordinate
		drops[i].y++;
	}
}

$(window).ready(function(){
  resize();
  init();
  setInterval(draw, 33);
});
