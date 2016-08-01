window.onload=function(){
	// 选项卡
	var nav_yidong=$(".nav_yidong");
	var xuanxiang=$(".xuanxiang");

	for(var i=0;i<nav_yidong.length;i++){
		nav_yidong[i].index=i;
		nav_yidong[i].onmouseover=function(){
			xuanxiang[this.index].style.display="block";
		}
		nav_yidong[i].onmouseout=function(){
			xuanxiang[this.index].style.display="none";
		}
	}
	var top_right_1=$(".top_right_1")[0];
	var top_r1_xuanxiang=$(".top_r1_xuanxiang")[0];

		top_right_1.onmouseover=function(){
			top_r1_xuanxiang.style.display="block";
		}
		top_right_1.onmouseout=function(){
			top_r1_xuanxiang.style.display="none";
		}
	var top_right_2=$(".top_right_2")[0];
	var erweima=$(".erweima")[0];

		top_right_2.onmouseover=function(){
			erweima.style.display="block";
		}
		top_right_2.onmouseout=function(){
			erweima.style.display="none";
		}
	

	var anniu=$("input",$(".anniu")[0]);
	for(var i=0;i<anniu.length;i++){
		anniu[i].index=i;
		anniu[i].onclick=function(){
			for(var j=0;j<anniu.length;j++){
			anniu[j].className="";
		}anniu[this.index].className="anniu_button";
}
}
	// 无缝轮播
	var win=$(".banner_middle")[0];
	var as=$("a",win);
	var lis=$("li",$(".point")[0]);
	var num=0;
	var next=0;
	var widths=parseInt(getStyle(as[0],"width"));
	var btnR=$(".btnR",win)[0];
	var btnL=$(".btnL",win)[0];
	var kaiguan=true;
		//初始化状态
	for(var i=0;i<as.length;i++){
		if(i==0){
			continue;//跳过当前这次循环
		}
		as[i].style.left=widths+"px";//初始化其余候位的图片
	}
	var t=setInterval(moveL,2000);

	win.onmouseover=function(){
	clearInterval(t);
	}
	win.onmouseout=function(){
	t=setInterval(moveL,2000);
	}
	btnR.onclick=function(){
	if(kaiguan){
		kaiguan=false;
		moveL();
	}
	}
	btnL.onclick=function(){
	if(kaiguan){
		kaiguan=false;
		moveR();
	}
	
	}
	
	//选项卡
	for(var i=0;i<lis.length;i++){
	lis[i].index=i;
	lis[i].onclick=function(){
		//当前的还是num，下一张next相当于this.index;
		if(num==this.index){
			return;
		}
		if(num<this.index){
			as[this.index].style.left=widths+"px";
		lis[num].className="";
		lis[this.index].className="point_hot";
		animate(as[num],{left:-widths});
		animate(as[this.index],{left:0});
		next=this.index;
		num=this.index;	
		}
		if(num>this.index){
			as[this.index].style.left=-widths+"px";
		lis[num].className="";
		lis[this.index].className="point_hot";
		animate(as[num],{left:widths});
		animate(as[this.index],{left:0});
		next=this.index;
		num=this.index;	
		}
		
	}

}


	function moveL(){
		next++;
		//限定边界
		if(next==as.length){
			next=0;
		}
		//就位
		as[next].style.left=widths+"px";
		//按钮
		lis[num].className="";
		lis[next].className="point_hot";
		//开始动画，当前图片向左离开
		animate(as[num],{left:-widths});
		//下张图片移动到当前窗口
		animate(as[next],{left:0},function(){
			kaiguan=true;
		});
		//更新下标
		num=next;
		
	}
	function moveR(){
		next--;
		//限定边界
		if(next<0){
			next=as.length-1;
		}
		//就位
		as[next].style.left=-widths+"px";
		//按钮
		lis[num].className="";
		lis[next].className="point_hot";
		//开始动画，当前图片向左离开
		animate(as[num],{left:widths});
		//下张图片移动到当前窗口
		animate(as[next],{left:0},function(){
			kaiguan=true;
		});
		//更新下标
		num=next;
		
	}

	// 节点轮播
	var win=$(".fourbox")[0];
	nodeLunbo(win,1);
	function nodeLunbo(obj,num){

		var imgBox=$(".imgbox")[0];
		var as=$("a",imgBox);
		var widths=parseInt(getStyle(as[0],"width"))+10;
		var btnL=$(".four_btnL",obj)[0];
		var btnR=$(".four_btnR",obj)[0];
		var flag=true;

		/*
		设置imgBox宽度
		*/
		imgBox.style.width=widths*as.length+"px";
		var t=setInterval(moveL,1000);
		obj.onmouseover=function(){
			clearInterval(t)
		}
		obj.onmouseout=function(){
			t=setInterval(moveR,1000)
		}
		btnL.onclick=function(){
			if(flag){
				flag=false;
				moveL();
			}
			
		}
		btnR.onclick=function(){
			if(flag){
				flag=false;
				moveR();
			}
			
		}
		/*
		向左移动：
		1、先移动imgBox
		2、把第一张图片放到最后
		*/
		function moveL(){
			animate(imgBox,{left:-num*widths},function(){
				for(var i=0;i<num;i++){
					var first=firstChild(imgBox);
					imgBox.appendChild(first);
					imgBox.style.left=0;
					
				}
				flag=true;
			});
		}

		function moveR(){
			for(var i=0;i<num;i++){
				var last=lastChild(imgBox);
				beforeChild(imgBox,last);
				imgBox.style.left=-num*widths+"px";
			}
			animate(imgBox,{left:0},function(){
				flag=true;
			});
		}

	}


	/*var rightTop=$(".right_top_1")[0];
	var tubiao=$(".banner_rimg",rightTop)[0];
	tubiao.onmouseover=function(){
		animate(tubiao,{width:80,height:80})
	}
	tubiao.onmouseout=function(){
		animate(tubiao,{width:50,height:50})
	}
	*/
	var fourgimg=$(".bot_r_1_img");
	for(var i=0;i<fourgimg.length;i++){
		fourgimg[i].index=i
	fourgimg[i].onmouseover=function(){
		animate(fourgimg[this.index],{right:20})
	}
	fourgimg[i].onmouseout=function(){
		animate(fourgimg[this.index],{right:0})
	}
}
	var fourgimg1=$(".bot_r_2_img");
	for(var i=0;i<fourgimg.length;i++){
		fourgimg1[i].index=i
	fourgimg1[i].onmouseover=function(){
		animate(fourgimg1[this.index],{right:20})
	}
	fourgimg1[i].onmouseout=function(){
		animate(fourgimg1[this.index],{right:0})
	}
}
	


	var buyBot=$(".buy_l1_img");
	for(var i=0;i<buyBot.length;i++){
		buyBot[i].index=i;
		buyBot[i].onmouseover=function(){
				animate(buyBot[this.index],{right:10})
			}
		buyBot[i].onmouseout=function(){
				animate(buyBot[this.index],{right:0})
			}
	 }
	

	var busi=$(".busi_bot_r_1_img");
	for(var i=0;i<busi.length;i++){
		busi[i].index=i
		busi[i].onmouseover=function(){
				animate(busi[this.index],{right:20})
			}
		busi[i].onmouseout=function(){
				animate(busi[this.index],{right:0})
			}
	}
	


}




