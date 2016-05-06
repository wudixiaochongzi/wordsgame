function game (box,levels,scores,start,pause,end,action) {
	this.box=box;
	this.levels=levels;
	this.scores=scores;
	this.sta=start;
	this.pau=pause;
	this.en=end;
	this.act=action;
	this.letter=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	this.letterArr=[];
	this.speed=2;
	this.num=4;
	this.tim=30;
	this.level=1;
	this.score=0;
	this.life=10;
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	this.getLetter(4);
	this.start();
	this.end();
}
game.prototype = {
	getLetter:function(num){
		for(var i=0; i<num; i++){
			var div=document.createElement('div');
			div.style.cssText="width:60px; height:64px; background:url(./images/fudai.png) no-repeat center; background-size: 60px 64px; color:#fff; position:absolute; font-size:34px; line-height:78px; text-align:center; color:#000; font-family:'Arial'; font-weight:600; left:"+(Math.random()*(this.cw-600)+300)+"px;top:"+(Math.random()*(-64)-80)+"px";
			div.class="divLetter";
			this.box.appendChild(div);  //把创建的div添加到页面中
			this.letterArr.push(div);  //把创建好的div保存到数组中，方便获取
			div.innerHTML=this.letter[Math.floor(Math.random()*this.letter.length)]; //div中的字母从letter这个数组中随机获取
		}
	},
	play:function(){
		var that=this;
		var m=setInterval(move,that.tim);
		function move(){
			if (that.letterArr.length<that.num) {
				that.getLetter(that.num-that.letterArr.length);
			};
			for(var i=0; i<that.letterArr.length; i++){
				that.letterArr[i].style.top=(that.letterArr[i].offsetTop+that.speed)+'px';
				if ((that.letterArr[i].offsetTop)>that.ch) {
					that.box.removeChild(that.letterArr[i]);
					that.letterArr.splice(i,1);
					that.score--;  //每从屏幕下方出去一个盒子，分数减1
					if (that.score<0) {
						that.score=0;
						that.scores.innerHTML=that.score;
						var con=confirm("YOU LOSE!\n\n请重新开始");
						if (con!=null) {
							location.reload();
						}
					};
					that.scores.innerHTML=that.score;
				};
				if (that.score==11) {
					that.level=2;
					that.levels.innerHTML=that.level;
					clearInterval(m);
					that.tim=20;
					m=setInterval(move,that.tim);
				};
				if (that.score==31) {
					that.level=3;
					that.levels.innerHTML=that.level;
					clearInterval(m);
					that.tim=10;
					m=setInterval(move,that.tim);
				};
			}
		}
		//暂停功能
		that.pau.onclick=function(){
			if (that.pau.innerHTML=="暂停") {
				that.pau.innerHTML="继续";
				that.pau.style.background='green';
				clearInterval(m);
				document.onkeydown=null;
			}else{
				that.pau.innerHTML="暂停";
				that.pau.style.background='#E74A2F';
				m=setInterval(move,that.tim);
				that.key();
			}
		}
	},
	key:function(){
		var that=this;
		document.onkeydown=function(e){
			var ev=e||window.event;
			for(var i=0; i<that.letterArr.length; i++){
				if (String.fromCharCode(ev.keyCode)==that.letterArr[i].innerHTML) {  //当键盘按下的字母和
					that.box.removeChild(that.letterArr[i]);
					that.letterArr.splice(i,1);  //从div数组中删除这个div
					that.score++;
					that.scores.innerHTML=that.score;
					break;  //如果不加，当页面上有多个相同的字母，按下键盘时，他们都同时消失
				};
			}
		}
	},
	//开始功能
	start:function(){
		var that=this;
		var flag=true;
		this.sta.onclick=function(){
			if (!flag) {
				return;
			};
			that.play();
			that.key();
			flag=false;
		}
	},
	//结束功能
	end:function(){
		this.en.onclick=function(){
			location.reload();
		}
	}
};