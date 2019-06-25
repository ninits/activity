
/*Scroll*/
function autoScroll(obj){  
			$(obj).find("ul").animate({  
				marginTop : "-25px"  
			},500,function(){  
				$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
			})  
		}  
		
function closeTip()  
{  
var erwm = document.getElementById('erwm');  erwm.style.display="none";  }  
//返回顶部
function b() {
	h = $(window).height(),
	t = $(document).scrollTop(),
	t > h ? $("#back_top").show() : $("#back_top").hide()
}
$(document).ready(function() {
	
	$(".btn_01").click(function(){
		$("#queryDiv").show();
		$(".pop_black").show();
	})
	
	b(),
	$("#back_top").click(function() {
		$(document).scrollTop(0)
	})
}),
$(window).scroll(function() {
	b()
});
		
