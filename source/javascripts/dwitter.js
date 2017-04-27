var dwitter = function(canvas){
  ///// Main loop from https://www.dwitter.net

  var S = Math.sin;
  var C = Math.cos;
  var R = function(r,g,b,a) {
    a = a === undefined ? 1 : a;
    return "rgba("+(r|0)+","+(g|0)+","+(b|0)+","+a+")";
  };

  var c = $(canvas)[0];
  var x = c.getContext("2d");

  var _dwitter = function(u){
    var start = new Date().getTime();

    setInterval(function(r){
      var current = new Date().getTime();
      var t = (current - start) / 1000;
      u(t);
    }, 1000/60);
  }

  //////////////////////////////////
  ///// Various effects from dwitter

  _dwitter.tunnel = function(t){
    c.width=1000;for(i=0;s=300,a=s/(s-(t+i*s/900)%s),i<900;i++){x.strokeRect(500-a*(1+S(t))/2,250-a*(1+C(t*2))/2,a,a)}
  }

  _dwitter.sea = function(t){
    for(i=c.width|=0;i--;x.fillRect(i%98*J,J*(9-C(i/4-t)),9,9))J=2e4/i;
  }

  _dwitter.old_movie = function(t){
    r=Math.random
    c.style.boxShadow=`inset 0px ${r()*20}px 10em #642`
    c.width=w=1450
    for(i=10;i--;x.fillRect(r()*w,0,1,w));
  }

  _dwitter.wire_ball = function(t){
    c.width^=0;r=200;for(θ=44/7;θ>0;θ-=.7/(C(t)+1))for(φ=p=11/7;φ>-p;φ-=1/r)x.lineTo((C(t)*S(φ)-S(t)*C(φ)*S(θ))*r+r*2,C(φ)*C(θ)*r+r);x.stroke()
  }

  _dwitter.smileys = function(t){
    c.width=1000;x.resetTransform();x.translate(100,400);s=3*(t*10%10);x.scale(s,s);x.fillText(String.fromCodePoint(0x1F600+(t%80)|0),0,0);
  }

  _dwitter.static_tv = function(t){
    window.i++;if(window.i%5)return;w=c.width=1450;h=500;m=Math.random;for(i=0;i<100;++i)x.fillRect(m()*w, m()*h, m()*100, m()*100)
  }

  _dwitter.walking_rectangles = function(t){
    c.width*=1;
    for(i=0;i<32;i++){
      x.fillRect(X=-400+i*100+S(t+i)*300, 200 + 45*C(t+i), 50, 200);
      x.fillStyle=`hsl(`+(X/20+t*20)+`,80%,50%)`;
    }
  }

  _dwitter.psychadelic = function(t){
    e=2e3;for(i=e;--i;)x.fillStyle=R((d=i%16*119)%256,d/1.4%256,d/7%256),m=i*t/100,n=10*i/200,x.fillRect(n*S(m)*30+500,n*C(m)*30+250,20,20);
  }

  return _dwitter;
}
