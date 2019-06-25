$(document).ready(function () {
	Vue.http.options.emulateHTTP = true;
	Vue.http.options.emulateJSON = true;
	Vue.http.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

	Vue.config.devtools = true;

	var app = new Vue({
			el: '#box1',
			data: {
				hall_API:'../../req.sys.php',
				// hall_API:'http://192.168.1.150/u0066/20190417_paul/req.sys.php',
				// hall_API:'http://2dev.us/0028/hall/20190417/req.sys.php',
				ip:'',
				arr: [],
				arr_all:[],
				arr2: [],
				queryarr: '',
				index: 0,
				id: -1,
				layerid: -1,
				vcode: '',
				userid: '',
				money:'',
				vcodemsg: '',
				ErrTitle: '',
				queryid: '',
				queryuser: '',
        qipao:false,
        neirong:'',
				queryindex:0,
				
				// 以下nini
				start:0,
				arr1: {
					eventname:'',
					htmlurl:'',
					remind:'',
					warning:'',
					fieldinfo:[{
						id:'',
						fieldname:'',
						value:''
					},{
						id:'',
						fieldname:'',
						value:''
					}]
				},
				content: '',
				codeurl: '',
				act: '',
				title: '',
				index_content:{
					announce:[{
						info:''
					}],
					footer_image:[{
						info:''
					}],
					footer_text:[{
						info:''
					}],
					ftd_text:[{
						info:''
					},{
						info:''
					}],
					image:[{
						info:''
					},{
						info:''
					},{
						info:''
					}],
				},
				indexButton:{
					grid:[],
					slider:[]
				},
				tipmsg:'',
				eventlist_total:0,
				page_show:(window.location.href.indexOf('wap') == '-1')?7:5,
				event_num:21
			},
			mounted:function(){
				window.setTimeout(function(){
					$(".loading").fadeOut(500)
				},400)
				
				if(window.location.href.indexOf('wap') == '-1'){
					this.$http.get('script/getIp.php').then(function (res) {
						console.log('ip',res.data);
						this.ip=res.data;
					});
				}else{
					this.$http.get('../script/getIp.php').then(function (res) {
						console.log('ip',res.data);
						this.ip=res.data;
					});
					
				}
			},
			watch:{
				ip:function(){
					// if(this.ip=='') return false;
					// 初始设定
					if(this.queryid.id==0) this.queryid=null;
					var vm = this;
					postValue='JDATA={"data":{"app":"front","func":"showappli"},"userip":"'+this.ip+'"}'

					this.$http.post(this.hall_API, postValue).then(function (res) {
						// successCallback
						console.log('中奖人, 中奖活动',res.data.data);
						// console.log(res.json())
						this.arr2=res.data.data;
					});

					this.eventlist_page(1,this.event_num); //現在第幾頁,一頁顯示幾個

					var indexContent='JDATA={"data":{"app":"front","func":"show"},"userip":"'+this.ip+'"}'

					this.$http.post(this.hall_API, indexContent).then(function (res) {	
							this.index_content = res.data.data;
							console.log('footer, header, 公告跑马灯',res.data.data)							
					});

					var gridshow='JDATA={"data":{"app":"front","func":"gridshow","limit":"","offset":"999","start":"","end":""},"userip":"'+this.ip+'"}'
					this.$http.post(this.hall_API, gridshow).then(function (res) {	
						
						console.log('漂浮按钮, 中下按钮',res.data.data)
						this.indexButton=res.data.data;
					});

					// 1html
					var actid = this.getQueryString('act_id');
					this.id=actid;
					
				},
				id:function(){
					var detail='JDATA= {"data":{"app":"front","func":"showinfo","eventid":"'+this.id+'"},"userip":"'+this.ip+'"}'

					this.$http.post(this.hall_API, detail).then(function (res) {
						this.arr1 = res.data.data[0];
						console.log('1.html',this.arr1)
						if(this.getQueryString('act_id')){
							document.title=this.arr1.eventname;
						// if($('#nhtml'))$('#nhtml').load(this.arr1.htmlurl)
						}
					});
				},
				eventlist_total:function(){
					eventAll2='JDATA={"data":{"app":"front","func":"eventlist","groupid":"0","limit":"'+this.eventlist_total+'","offset":"0","start":"","end":""},"userip":"'+this.ip+'"}'

					this.$http.post(this.hall_API, eventAll2).then(function (res) {
						console.log('所有活动',res.data.data)						
						this.arr_all = res.data.data;
					});

					// 取全部活動資料
					// eventAll3='JDATA={"data":{"app":"front","func":"showevent","limit":"","offset":"","start":"","end":""},"userip":"'+this.ip+'"}'

					// this.$http.post(this.hall_API, eventAll3).then(function (res) {
					// 	console.log('所有活动444',res)						
					// });
				}
			},    
			methods: {		
				showTip:function(msg){
					this.layerid = 4;
					this.tipmsg=msg;
				},
				analysisStatus:function(errorCode){
					switch (errorCode) {
						case "001":
						alert("填写内容含特殊符号或空白")
						break;
						case "002":
						alert("填写栏位有空白")
						break;
						case '003':
						alert("申请金额栏位填写有误")
						break;
						case '003':
						alert("申请金额栏位填写有误")
						break;
						case 'apply':
						alert("申请频率过快,请稍后再试")
						break;
						case 'banned':
						alert("此帐号在短时间内申请次数过多,请稍后再试")
						break;
						case 'daylimit':
						alert("每日申请次数已达上限")
						break;
						default:
						console.log(errorCode)
						alert("Special_Error")
						break;
					} 
				},
				getQueryString:function(name) {
					var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
					var r = window.location.search.substr(1).match(reg);
					if (r != null) {
						return unescape(r[2]);
					}
					return null;
				},
				reg: function () {		
					var vm=this;
					var field=JSON.stringify(this.arr1.fieldinfo)
					// var actid = this.getQueryString('act_id');
					var data='JDATA= {"data":{"app":"front","func":"application","eventid":"'+this.id+'","eventname":"'+this.arr1.eventname+'","field":'+field+'},"userip":"'+this.ip+'"}'

					this.$http.post(this.hall_API, data).then(function (str) {
						console.log(str)
						if (str.data.result == 1) {
							alert("申请成功")
							window.location.reload();
						} else if(str.data.error[1]){
							alert(str.data.error[1])
						}else{
							vm.analysisStatus(str.data.error[0])
						}

					})
					
				},
				query: function (a) {
					if (this.queryuser == "") {
						alert("请输入会员账号！");
						return false;
					}

					this.start=0;
					
					var vm= this;
					//.eventname
					if(a=='one') this.queryid=this.arr1;
					console.log(this.queryid)
					var check='JDATA={"data":{"app":"front","func":"check","username":"'+this.queryuser+'","eventname":"'+this.queryid.eventname+'"},"userip":"'+this.ip+'"}'
					this.$http.post(this.hall_API, check ).then(function (res) {
						console.log('審核進度查詢結果',res)
						if (res.data.result == 1) {
							vm.queryarr = res.data.data;
							vm.layerid = 3;
						} else {
							vm.analysisStatus(res.data.error[0])
							return false;
						}
					})
				},
				clickpage:function(i,pagenum){
					this.start=pagenum*(i-1);
				},
				eventlist_page:function(i,pagenum){
					eventAll='JDATA={"data":{"app":"front","func":"eventlist","groupid":"0","limit":'+pagenum+',"offset":'+pagenum*(i-1)+',"start":"","end":""},"userip":"'+this.ip+'"}'

					this.$http.post(this.hall_API, eventAll).then(function (res) {
						console.log('中间活动',res.data.data)
						console.log('中间活动111',res.data.total)
						//console.log(res.data.actlist);
						this.arr = res.data.data;
						this.eventlist_total=res.data.total;
					});
				},
				chakan:function(title){
 
					$("#chakan").html(title);
					$('.chakan').show();
					setTimeout(function(){
					  $('.chakan').hide();
					},3000)
				}
			}
		});

})
