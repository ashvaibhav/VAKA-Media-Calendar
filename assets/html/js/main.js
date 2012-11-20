function populateAllEvents(){
	var res = getDataForAllEvents();
	//if result is not null, remove logo	
	if(res){
		$("#logo").css('display','none');
	}
	res = res.split(",");
	
	//for every element in res
	//populateOneEvent(data)	
	for(resIndex in res){
		var dataForOneEvent = res[resIndex];
		var data = dataForOneEvent.split(":");
		populateOneEvent(data[0],data[1],data[2],data[3]);
	}
}
function getDataForAllEvents(){
	//return ButtonHandlers.onEventListClick();
	return "We plan to meet... :3-30 PM on 10/30... :25 Oct at 1...:audio, another event:trying to get it:figured out:video";	
}
function populateOneEvent(title, date, metadata, type){
		var eventList = $("#eventList");
		//var eventItem = "<div style='background-image: url('images/eventList/event_box.png');'>";
		var eventItem = "<div>";
		//eventItem += "<span><img src='images/eventList/event_box.png'/><span>";
		//the complete item
			eventItem+= "<HR>"; 
 			eventItem += "<span style='position:relative;'>"; 			
 			eventItem += "<span style='position:relative;left:-300px;'><img src='images/eventList/check_box1.png'></span>";
		//the complete text of item
 			eventItem += "<span style='position:relative;top:-130px;left:-100px;'><BR>"+title+"<BR>";
 			eventItem += "<span style='position:relative;top:-10px;left:80px;'>"+date+"</span>"; 			 			
 			eventItem += "<span style='position:relative;top:60px;left:-60px;'><img src='images/eventList/"+type+"_icon_s.png'></span>"; 			 			
 			eventItem += "<span style='position:relative;top:50px;left:10px;'>"+metadata+"</span>"+"</span>";
 		eventItem += "</span>";
 		//delete icon
 		eventItem += "<span style='position:relative;top:-80px;left:150px;'><img src='images/eventList/delete_btn_s.png'></span>";
		eventItem += "<HR>";
 		
 		//display top of the div and expansion option
 		//display approval button
 		//display text
 		//display delete icon
 		//display recorded date and timings
 		eventItem += "</div>";
 		eventList.append(eventItem);
 }
 function getScreenHeight(){
	return $(window).height();
}
function getScreenWidth(){
	return $(window).width();
}
function toggleMainButton(control){
	//var mainButton = $('#main_button');
	//var control = $("#"+control.id);
	var isPlus = control.innerHTML.indexOf("plus")>0?true:false;
	if(isPlus){
	clickPlus();
	/*//alert(isPlus);
	$("#plus_button").hide();
	$("#expanded_default").show();*/
	}
	else{
	clickMinus();
	/*alert(isPlus);
	$("#expanded_default").hide();
	$("#plus_button").show();*/
	}
	
}
function clickPlus(){	
	var mainButton = $('#togglePlusDiv');
	mainButton.css("display","none");
	$("#toggleMinusDiv").css("display","inline");
	$("#area1").hover(function(e){alert("Hello");});
//	$("#alert").hover(function(e){alert("Hello2");});
//	$("#pie_controls")
	//waste below this line
/*	//remove existing button
//	mainButton.html();
	//display the new button
//	mainButton.css("position","relative");
//	mainButton.css("top","-78px");
	//this image should zoom in
//	mainButton.append("<img src= 'images/expanded_default.png'></img>");
*/
}
function showAudio(){
	$("#toggleMinusDiv").css("display","none");
	$("#pie_audio").css("display","inline");
}
function clickMinus(){
	var mainButton = $('#toggleMinusDiv');
	mainButton.css("display","none");	
	$("#togglePlusDiv").css("display","inline");

	//waste below this line	
/*	var mainButton = $('#toggleDiv');
	//remove existing button
	//present image should zoom out
	mainButton.html();
	//display the new button
	mainButton.css("position","relative");
	mainButton.css("top","-37px");
	mainButton.html("<img src = 'images/plus_button.png'>"+
/// *	"<map name='bkgdMap' id='bkgdMap'>"+
         	"<area shape="rect" coords='12,161,341,379' href='#' 

alt='qdk' id='qdk' class='mapping' />"+
         	"<area shape='rect' coords='347,162,675,379' href='#' 

alt='gifgif' alt='gifgif' class='mapping' />"+
    	"</map>"+// * /
	"</img>");
*/
}
