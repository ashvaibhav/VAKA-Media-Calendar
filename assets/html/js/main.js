//Global Variables
var debug = true;
var dataForAllEvents;

//called from EventList page
function populateAllEvents(){	
	getDataForAllEvents();//populating dataForAllEvents 
	var res = dataForAllEvents
	//if result is not null, remove logo	
	if(res){
		$("#logo").css('display','none');
	}
	//res = res.split(",");
	
	//for every element in res
	//populateOneEvent(data)	
	for(resIndex in res){	
		var data = res[resIndex];//ForOneEvent		
		//var data = dataForOneEvent.split(":");
		var type = "";
		switch(data.type){
			case 1:
				type = "audio";
				break;
			case 2:
				type = "video";
				break;
			case 3:
				type = "photo";
				break;
		}
		populateOneEvent(data.id, data.title, data.from, data.metadata, type);//id, type, title, from ,to ,place , description
	}
}
//getting data from Android about all events
function getDataForAllEvents(){
var result = "";
if(!debug)
	result = EventService.getAllEvents();
else
	result = '['+
				'{"id":"1","title":"This meeting 1 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"2","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"3","title":"This meeting 3 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"'+
				
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
				'","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"4","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"5","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"6","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"7","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"8","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"},'+
				'{"id":"9","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting"}'+
			 ']';
result = JSON.parse(result);
dataForAllEvents = result;	
	//return "We plan to meet... :3-30 PM on 10/30... :25 Oct at 1...:audio, another event:trying to get it:figured out:video";	
}
//displaying one event data in EventList html page
function populateOneEvent(id, title, date, metadata, type){
		var eventList = $("#eventList");
		//var eventItem = "<div style='background-image: url('images/eventList/event_box.png');'>";
		var eventItem = "<div>";
		//eventItem += "<span><img src='images/eventList/event_box.png'/><span>";
		//the complete item
			eventItem+= "<HR>"; 
 			eventItem += "<span style='position:relative;'>";
 			eventItem += "<span style='position:relative;left:400px;top:-108px;' onClick='javascript:editEvent("+id+");'><img src='images/eventList/event_plus.png'></span>"; 			
 			eventItem += "<span style='position:relative;left:-400px;'><img src='images/eventList/check_box1.png'></span>";
		//the complete text of item
 			eventItem += "<span style='position:relative;top:-130px;left:-100px;'><BR>"+
 							title+ 						
 						"<HR style='width:200px;'>";
 			eventItem += "<span style='position:relative;top:-10px;left:80px;'>"+date+"</span>"; 			 			
 			eventItem += "<span style='position:relative;top:60px;left:-60px;'><img src='images/eventList/"+type+"_icon_s.png'></span>"; 			 			
 			eventItem += "<span style='position:relative;top:50px;left:10px;'>"+metadata+"</span>"+"</span>";
 		//delete icon
 			eventItem += "<span style='position:relative;top:0px;left:200px;'><img src='images/eventList/delete_btn_s.png'></span>";
 		eventItem += "</span>"; 		 		
		eventItem += "<HR style=';border:1px solid #58585b; box-shadow: 0 2px 5px 1px #939597;'>";
 		
 		//display top of the div and expansion option
 		//display approval button
 		//display text
 		//display delete icon
 		//display recorded date and timings
 		eventItem += "</div>";
 		eventList.append(eventItem);
 }
 function approveEvent(currentEvent){ 	
 	//currentEvent = JSON.parse(currentEvent);
	alert("You want me to approve event: "+currentEvent);
 }
 function collapseEditEvent(){
 		$("#edit_screen").hide(); 		
 		$("#main_screen").show();
 		//deleting data
 		$("#updateEvent").empty();;		
 }
 function expandEditEvent(){
 		$("#main_screen").hide();
		$("#edit_screen").show();
 }
 function editEvent(id){
	//search event with this id in global variable
	var currentEvent;
	for(index in dataForAllEvents){
		if(dataForAllEvents[index].id == id){
			currentEvent = dataForAllEvents[index]; 
		}		
	}	
	if(!currentEvent)
		window.location = "https://www.google.com/search?q=page+not+found&hl=en&tbo=d&source=lnms&tbm=isch&sa=X&ei=6xusUMC7MOKCiwK-y4DoAw&ved=0CAcQ_AUoAA&biw=1366&bih=667"
	else{		
		expandEditEvent();
		$("#main_screen").hide();
		$("#edit_screen").show();
		var eventData = "<div id='editEventForm"+id+"' style='text-align:left;margin-left:250px;'>";
			//buttons
			eventData += "<div>"+
							"<a href='javascript:approveEvent(\""+currentEvent+"\")' alt='approval' title='approval'>"+
								"<img src='images/eventList/check_box1.png'/>"+
							"</a>"+
							"<a href='javascript:approveEvent("+currentEvent+")' title='alarm'>"+
								"<img src='images/eventList/check_box1.png'/>"+
							"</a>"+
							"<a href='javascript:approveEvent("+currentEvent+")' title='reset'>"+
								"<img src='images/eventList/check_box1.png'/>"+
							"</a>"+
							"<a href='javascript:approveEvent("+currentEvent+")' title='delete'>"+
								"<img src='images/eventList/check_box1.png'/>"+
							"</a>"+
							"<a href='javascript:collapseEditEvent();' title='collapse'>"+
								"<img src='images/eventList/check_box2.png'/>"+
							"</a>"+
						"</div>";
			//preview
			//display date and form
			eventData += "<div>"+
						 "<table border = 0>"+
							"<tr>"+
								"<td>Title</td>"+
								"<td><input type='text' id='title"+id+"' value='"+currentEvent.title+"'/></td>"+
								"<td>Preview associated media</td>"+
							"</tr>"+
							"<tr>"+
								"<td>From</td>"+
								"<td><input type='text' id='from"+id+"' value='"+currentEvent.from+"'/></td>"+
								"<td>Preview associated media</td>"+
							"</tr>"+
							"<tr>"+
								"<td>To</td>"+
								"<td><input type='text' id='to"+id+"' value='"+currentEvent.to+"'/></td>"+
								"<td>Preview associated datePicker</td>"+
							"</tr>"+
							"<tr>"+
								"<td>Place</td>"+
								"<td><input type='text' id='to"+id+"' value='"+currentEvent.place+"'/></td>"+
								"<td>Google Place</td>"+
							"</tr>"+
							"<tr>"+
								"<td colspan=3>Description</td>"+								
							"</tr>"+
							"<tr>"+
								"<td colspan=3><textarea id='description"+id+"' rows=20 cols=60>"+
									currentEvent.description+
								"</textarea></td>"+								
							"</tr>"+
							"<tr>"+
								"<td colspan=1></td>"+
								"<td colspan=2 style='text-align:right;'>Save Reminder Delete</td>"+								
							"</tr>"+
						"</table>"+
						"</div>";
			/*
			eventData += "<span style='position:relative;left:100px;'>TITLE:</span>";
			eventData += "<span style='position:relative;left:200px;'><input type='text' id='title"+id+"'/></span>";
			eventData += "<span style='position:relative;left:300px;'>Preview associated media</span><BR>";
			eventData += "<span style='position:relative;left:100px;'>FROM:</span>";
			eventData += "<span style='position:relative;left:200px;'><input type='text' id='from"+id+"'/></span>";
			eventData += "<span style='position:relative;left:300px;'>datepicker from</span><BR>";
			eventData += "<span style='position:relative;left:100px;'>TO:</span>";
			eventData += "<span style='position:relative;left:200px;'><input type='text' id='to"+id+"'/></span>";
			eventData += "<span style='position:relative;left:300px;'>datepicker To</span><BR>";
			eventData += "<span style='position:relative;left:100px;'>PLACE:</span>";
			eventData += "<span style='position:relative;left:220px;'><input type='text' id='place"+id+"'/></span>";
			eventData += "<span style='position:relative;left:300px;'>Google Place</span><BR>";
			*/
		eventData += "</div>";
		$("#updateEvent").append(eventData);
	}
			
	//populate the bigger div
	//populate all sections
	//make controls
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
