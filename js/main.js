// DOM Ready
$(function(){

  //悬浮广告
  var duilian = $("div.duilian");
  var duilian_close = $("a.duilian_close");

  var screen_w = screen.width;
  if(screen_w>1024){duilian.show();}
  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
    duilian.stop().animate({top:scrollTop+200});
  });
  duilian_close.click(function(){
    $(this).parent().hide();
    return false;
  });

  // 弹出1
  function showDetail() {

    var bgObj=document.getElementById("bgDiv");
    bgObj.style.width = document.body.offsetWidth + "px";
    bgObj.style.height = document.body.offsetHeight + "px";

    var msgObj=document.getElementById("msgDiv");
    //msgObj.style.marginTop = -300 +  document.documentElement.scrollTop + "px";

    document.getElementById("msgShut").onclick = function(){
    bgObj.style.display = msgObj.style.display = "none";
    }
    msgObj.style.display = bgObj.style.display = "block";
    // msgDetail.innerHTML=""
  }

  $('.j-btns-modal').click(function(){
    showDetail();
    $('#modal-1').show();
    $('#modal-2').hide();
    $('#modal-3').hide();
  })

  $('.j-btn-submit').click(function(){
		 
			var uname = $("#query_user").val();
			if(uname == ""){
				alert("会员帐号不能为空!");
				return false;
			}
			$(".con1").hide();
			$(".con2").fadeIn();
			queryPage(1);		
 
    $('#modal-1').hide();
    $('#modal-2').show();
    $('#modal-3').hide();
  })

  $('.j-btn').click(function(){
    showDetail();
    $('#modal-3').show();
    $('#modal-1').hide();
    $('#modal-2').hide();
  })

  $('.j-btn-back').click(function(){
    $('#msgDiv,#bgDiv').hide();
  })

  //unslider
  var unslider01 = $('#s01').unslider({
    dots: true
  }),
  data01 = unslider01.data('unslider');

  $('.unslider-arrow04').click(function() {
        var fn = this.className.split(' ')[1];
        data01[fn]();
    });

  $(".slider-close").click(function(){
    $('#s01').hide();
  })


})
function lotterylist() {
	$.ajax({
		url: '',
		dataType: 'json',
		cache: false,
		type: 'GET',
		success: function(obj) {
			var sAwardEle = "";
			$.each(obj, function(i, award) {
				sAwardEle += '<li>恭喜：<span>'+award.user_name+'</span>成功办理<i>'+award.active_name+'</i></li>'
			});
			$(".infoList").html(sAwardEle);
			jQuery(".list").slide({mainCell:".bd ul",autoPlay:true,effect:"topMarquee",vis:5,interTime:50,trigger:"click"});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			var x = 1
		}
	})
}
var pagesize = 2;
function queryPage(page) {
	$.ajax({
		url: 'api.php?action=querylist&p=' + page + '&size=' + pagesize,
		dataType: 'json',
		cache: false,
		data: {
			user_name: $("#query_user").val(),
			act_id: $("#query_option").val()
		},
		type: 'GET',
		success: function(obj) {
			if (obj.count != 0) {
				var sHtml1 = "";
				$.each(obj.data, function(i, award) {
					var temp = '<td>等待审核</td>';
					if (award.state == "1") {
						temp = '<td><font color=green>已通过</font></td>'
					}
					if (award.state == "2") {
						temp = '<td><font color=red>已拒绝</font></td>'
					}
					sHtml1 += "<tr><td>" + award.user_name + "</td><td>" + award.apply_time + "</td>" + temp + "<td><a href=\"javascript:showRemark('"+award.check_desc+"')\" style=\"color:#fff;\">点击查看</a></tr>";
				}) 
				var sPage = Paging(page, pagesize, obj.count, 2, "queryPage", '', '', '<', '>');
				$(".pages").html(sPage);
				$("#query_content").html(sHtml1)
				//$('.tip').miniTip({'className':'green'});
			} else {
				$("#query_content").html("<tr><td colspan='4'>未查询到信息</td></tr>")
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			var x = 1
		}
	})
}
function Paging(pageNum, pageSize, totalCount, skipCount, fuctionName, currentStyleName, currentUseLink, preText, nextText, firstText, lastText) {
	var returnValue = "";
	var begin = 1;
	var end = 1;
	var totalpage = Math.floor(totalCount / pageSize);
	if (totalCount % pageSize > 0) {
		totalpage++
	}
	if (preText == null) {
		firstText = "prev"
	}
	if (nextText == null) {
		nextText = "next"
	}
	begin = pageNum - skipCount;
	end = pageNum + skipCount;
	if (begin <= 0) {
		end = end - begin + 1;
		begin = 1
	}
	if (end > totalpage) {
		end = totalpage
	}
	for (count = begin; count <= end; count++) {
		if (currentUseLink) {
			if (count == pageNum) {
				returnValue += "<a class=\"" + currentStyleName + "\" href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> "
			} else {
				returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> "
			}
		} else {
			if (count == pageNum) {
				returnValue += "<a class=\"" + currentStyleName + "\">" + count.toString() + "</a> "
			} else {
				returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> "
			}
		}
	}
	if (pageNum - skipCount > 1) {
		returnValue = " ... " + returnValue
	}
	if (pageNum + skipCount < totalpage) {
		returnValue = returnValue + " ... "
	}
	if (pageNum > 1) {
		returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum - 1).toString() + ");\"> " + preText + "</a> " + returnValue
	}
	if (pageNum < totalpage) {
		returnValue = returnValue + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum + 1).toString() + ");\">" + nextText + "</a>"
	}
	if (firstText != null) {
		if (pageNum > 1) {
			returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(1);\">" + firstText + "</a> " + returnValue
		}
	}
	if (lastText != null) {
		if (pageNum < totalpage) {
			returnValue = returnValue + " " + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + totalpage.toString() + ");\">" + lastText + "</a>"
		}
	}
	return returnValue
}
function showRemark(msg){
	layer.alert(msg);
}
