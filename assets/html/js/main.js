//Global Variables
var debug = false;
var dataForAllEvents;
var currentEvent;

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
		var status = "";
		if(data.status){
			switch(data.status){
				case 1:
					status = "unapproved";break;
				case 2:
					status = "approved";break;
			}
		}
		else{
			data["status"] = 1;
			status = "unapproved";
		}
		if(!type)type=data.type;
		if(!status)status=data.status;
		if(data.status!=3)//if item is not deleted, display it
			populateOneEvent(data.id, data.title, data.from, data.metadata, type, status);//id, type, title, from ,to ,place , description
	}
}
//getting data from Android about all events
function getDataForAllEvents(){
var result = "";
if(!debug)
	result = EventService.getAllEvents();
else
	result = '['+
				'{"id":"1","title":"This meeting 1 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"audio","metadata":"stored info about meeting","status":1},'+
				'{"id":"2","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"video","metadata":"stored info about meeting","status":1},'+
				'{"id":"3","title":"This meeting 3 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", 								   "type":"photo","metadata":"stored info about meeting","status":1,"description":"'+				   
				
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
				'"},'+
				'{"id":"4","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":3,"metadata":"stored info about meeting","status":1},'+
				'{"id":"5","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":2,"metadata":"stored info about meeting","status":1},'+
				'{"id":"6","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting","status":1},'+
				'{"id":"7","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting","status":1},'+
				'{"id":"8","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting","status":1},'+
				'{"id":"9","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting","status":1}'+
			 ']';
result = JSON.parse(result);
dataForAllEvents = result;	
	//return "We plan to meet... :3-30 PM on 10/30... :25 Oct at 1...:audio, another event:trying to get it:figured out:video";	
}
//displaying one event data in EventList html page
function populateOneEvent(id, title, date, metadata, type, status){
		var eventList = $("#eventList");		
		var eventItem = "<div id='eventItem"+id+"' style='height:205px;'>";
			//the complete item
			eventItem+= "<HR>"; 
 			eventItem += "<span style='position:relative;text-align:left;'>";
 				eventItem += "<span style='position:absolute;left:0px;top:-10px;align:left;'>";
 					eventItem += "<span style='position:absolute;left:655px;top:0px;' onClick='javascript:editEvent("+id+");'>"+
 										"<img src='images/eventList/event_plus.png'>"+
 								"</span>"; 			
 					eventItem += "<span id='approvalIcon"+id+"' style='position:absolute;left:45px;top:55px;' onClick='javascript:toggleApproval("+id+");'>";
 								if(status=="approved")
 								eventItem += "<img src='images/eventList/check_box2.png'></span>";
 								else
 								eventItem += "<img src='images/eventList/check_box1.png'></span>";

					//the complete text of item
 					eventItem += "<span style='position:absolute;top:50px;left:200px;width:450px;'>"+title+"</span>"; 
 					eventItem += "<HR style='position:absolute;top:70px;left:200px; width:450px;'/>";
 					eventItem += "<span style='position:absolute;top:90px;left:200px;width:450px;'>"+date+"</span>";
 					eventItem += "<HR style='position:absolute;top:110px;left:200px; width:450px;'/>"; 			 			
 					eventItem += "<span style='position:absolute;top:130px;left:200px;width:450px;'><img src='images/eventList/"+type+"_icon_s.png'></span>"; 			 			
 					eventItem += "<span style='position:absolute;top:130px;left:240px;width:450px;'>"+metadata+"</span>"+"</span>";
 					//delete icon
 					eventItem += "<span style='position:absolute;top:110px;left:730px;' onClick='javascript:toggleDelete("+id+");'><img src='images/eventList/delete_btn_s.png'></span>";
 					eventItem += "<HR style='position:absolute;top:170px;width:800px;border:1px solid #58585b; box-shadow: 0 2px 5px 1px #939597;'>";
 				eventItem += "</span>";
 			eventItem += "</span>"; 		 		
 		
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
 function updateEventListWithCurrentEvent(){
 	if(!currentEvent) return;
 	for(index in dataForAllEvents){
		if(dataForAllEvents[index].id == currentEvent.id){
			dataForAllEvents[index] = currentEvent; 
		}		
	}
 }
 function collapseEditEvent(){
 		$("#edit_screen").hide(); 		
 		$("#main_screen").show();
 		//deleting data
 		$("#updateEvent").empty();;
 		updateEventListWithCurrentEvent();		
 		currentEvent = "";
 }
 function expandEditEvent(){
 		$("#main_screen").hide();
		$("#edit_screen").show();
		if(!currentEvent)
			redirectToError();
 }
 function redirectToError(){
 	alert("It seems you found a secret path!!!");
 	window.location = "https://www.google.com/search?q=page+not+found&hl=en&tbo=d&source=lnms&tbm=isch&sa=X&ei=6xusUMC7MOKCiwK-y4DoAw&ved=0CAcQ_AUoAA&biw=1366&bih=667"
 }
 function updateCurrentEvent(id){
	for(index in dataForAllEvents){
		if(dataForAllEvents[index].id == id){
			currentEvent = dataForAllEvents[index]; 
		}		
	}
	if(!currentEvent){
		redirectToError();
	}
 }
 function toggleDelete(id, fromEditPage){
	alert("Do you want to delete it?");
 	updateCurrentEvent(id);
 	currentEvent.status = 3;
 	$("#eventItem"+id).css("display","none"); 	
 	if(fromEditPage){
 		collapseEditEvent();
 	} 	
 	else
 		updateEventListWithCurrentEvent();
 }
 function toggleApproval(id, fromEditPage){
 	updateCurrentEvent(id);
 	//toggle the status 	
 	switch(currentEvent.status){
 		case 1:
 			currentEvent.status = 2;break;
 		case 2:
 			currentEvent.status = 1;break;
 	}
 	var eventItem = "";
 	if(currentEvent.status)
 			eventItem += "<img src='images/eventList/check_box"+currentEvent.status+".png'></span>";
 	else
 			eventItem += "<img src='images/eventList/check_box1.png'></span>";
 	//toggle icon on eventList page
 	$("#approvalIcon"+id).empty();
	$("#approvalIcon"+id).append(eventItem);
	//toggle icon on edit event page
 	if(fromEditPage){
 		if(currentEvent.status)
 			eventItem = "<img src='images/editEvent/calendar_btn"+currentEvent.status+".png'></span>";
 		else
 			eventItem += "<img src='images/editEvent/calendar_btn1.png'></span>";
 		$("#editEventApproval").empty().append(eventItem); 		
 	}

 	updateEventListWithCurrentEvent();
 }
 function alarmClick(){
 	alert("Alarm Under construction");
 }
 function reset(){
 	$("#editEventReset").empty().append("<img src='images/editEvent/undo_btn1.png'/>");
	currentEvent = initialStateOfEvent;
	updateEventListWithCurrentEvent();
	$("#updateEvent").empty();
	editEvent(currentEvent.id, true);
 }
 function datePicker(control){
	$("#editEvent"+control+"Text").datepicker("show");//editEventFrom
 	//alert("Date Picker under contruction - check ol js src");
 }
 function mapPicker(){
	var dropDown = "<input class='posAbs editEventDropDown place editEventTextBox editEventTextBoxContent editEventTextBoxStyle' type='text'/>";
	$("span[name=place]").append(dropDown);
 	//alert("Map Picker under contruction");
 }
 function editEvent(id, fromReset){
	//search event with this id in global variable
	if(!fromReset)
		updateCurrentEvent(id);	
	if(!currentEvent)
		redirectToError();
	else{		
		expandEditEvent();
		$("#main_screen").hide();
		$("#edit_screen").show();
		initialStateOfEvent = currentEvent;
		var formTable =		 "<table border = 0>"+
							"<tr>"+
								"<td><span class='posAbs editEventHead  title'> Title</span></td>"+
								"<td><span class='posAbs title'><input class='posAbs editEventTextBox' type='text' id='title"+id+"' value='"+currentEvent.title+"'/></span></td>"+
								"<td><span></span></td>"+
							"</tr>"+
							"<tr>"+
								"<td><span class='posAbs editEventHead  from'> From</span></td>"+
								"<td><span class='posAbs from'><input class='posAbs editEventTextBox' type='text' id='from"+id+"' value='"+currentEvent.from+"'/></span></td>"+
								"<td><span class='posAbs editEventTextButton from'><img src='images/editEvent/calendar_picker.png'/></span></td>"+
							"</tr>"+
							"<tr>"+
								"<td><span class='posAbs editEventHead  to' style='top:40px;'> To</span></td>"+
								"<td><span class='posAbs to'><input class='posAbs editEventTextBox' type='text' id='to"+id+"' value='"+currentEvent.to+"'/></span></td>"+
								"<td><span class='posAbs editEventTextButton to'><img src='images/editEvent/calendar_picker.png'/></span></td>"+
							"</tr>"+
							"<tr>"+
								"<td><span class='posAbs editEventHead place'> Place</span></td>"+
								"<td><span class='posAbs place'><input class='posAbs editEventTextBox' type='text' id='to"+id+"' value='"+currentEvent.place+"'/></span></td>"+
								"<td><span class='posAbs editEventTextButton place' style='top:300px;'><img src='images/editEvent/map_picker.png'/></span></td>"+
							"</tr>"+
							"<tr>"+
								"<td colspan=3><span class='posAbs editEventHead ' style='top:100px;'> Description</span></td>"+								
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
						"</table>";
						
		var formTable2 = "<span name='title'>"+
							"<span class='posAbs title editEventHead'>"+
									"Title"+
							"</span>"+
							"<span>"+
									"<input id='editEventTitle' class='posAbs title editEventTextBox editEventTextBoxStyle' type='text' id='title"+id+"' value='"+currentEvent.title+"'/>"+
							"</span>"+
						"</span>"+
						"<span name='from'>"+
							"<span class='posAbs from editEventHead'>"+
									"From"+
							"</span>"+
//							"<span class='posAbs from editEventTextBox editEventTextBoxContent editEventTextBoxStyle'>"+
//									currentEvent.from+
//							"</span>"+
							"<input id='editEventFromText' type='text' class='posAbs from editEventTextBox editEventTextBoxContent editEventTextBoxStyle' value='"+currentEvent.from+"'/>"+
							"<span id='editEventFrom' onClick='javascript:datePicker(\"From\");'><img class='posAbs from editEventTextButton ' src='images/editEvent/calendar_picker.png'/></span>"+
						"</span>"+
						"<span name='to'>"+
							"<span class='posAbs to editEventHead'>"+
									"To"+
							"</span>"+
//							"<span class='posAbs to editEventTextBox editEventTextBoxContent editEventTextBoxStyle'>"+
//									currentEvent.to+
//							"</span>"+
							"<input id='editEventToText' type='text' class='posAbs to editEventTextBox editEventTextBoxContent editEventTextBoxStyle' value='"+currentEvent.to+"'/>"+
							"<span id='editEventTo' onClick='javascript:datePicker(\"To\");'><img class='posAbs to editEventTextButton' src='images/editEvent/calendar_picker.png'/></span>"+
						"</span>"+
						"<span name='place'>"+
							"<span class='posAbs place editEventHead '>"+
									"Place"+
							"</span>"+
							"<span class='posAbs place editEventTextBox editEventTextBoxContent editEventTextBoxStyle'>"+
									currentEvent.place+
							"</span>"+
							"<span onClick='javascript:mapPicker();'><img class='posAbs place editEventTextButton' src='images/editEvent/map_picker.png'/></span>"+
						"</span>"+
						"<span name='description'>"+
							"<span class='posAbs description editEventHead '>"+
									"Description<BR>"+
							"</span>"+
							"<span>"+
								"<textarea class='posAbs description editEventTextBoxStyle editEventDescBox' id='description"+id+"' rows=20 cols=60>"+
									currentEvent.description+
								"</textarea>"+
							"</span>"+							
						"</span>";
						
		var eventData = "<div id='editEventForm"+id+"' style='position:relative;align:left;'>";
			eventData += "<HR>";			
			eventData += "<span style='position:relative;text-align:left;'>";
 				eventData += "<span style='position:absolute;left:0px;top:-10px;align:left;'>";
				eventData +=
						//collapseIcon 
							"<span style='position:absolute;left:655px;' onClick='javascript:collapseEditEvent();' title='collapse'>"+
								"<img src='images/editEvent/event_minus.png'/>"+
							"</span>"+
						//buttons
							"<span id='editEventApproval' style='position:absolute;left:20px;top:10px;' onClick='javascript:toggleApproval("+id+",true);' title='approval'>"+
								"<img src='images/editEvent/calendar_btn"+currentEvent.status+".png'/>"+
							"</span>"+
							"<span style='position:absolute;left:140px;top:10px;' onClick='javascript:alarmClick();' title='alarm'>"+
								"<img src='images/editEvent/alarm_btn1.png'/>"+
							"</span>"+
							"<span id='editEventReset' style='position:absolute;left:250px;top:10px;' onClick='javascript:reset();' title='reset'>"+
								"<img src='images/editEvent/undo_btn1.png'/>"+
							"</span>"+
							"<span style='position:absolute;left:360px;top:10px;' onClick='javascript:toggleDelete("+id+",true);' title='delete'>"+
								"<img src='images/editEvent/delete_btn1.png'/>"+
							"</span>"+
						//preview
							"<span style='position:absolute;left:20px;top:120px;width:760px;height:200px;border:1px solid;' title='collapse'>"+
								"<span>"+
									"<img src='images/eventList/"+currentEvent.type+"_icon_s.png'/>"+
									"<span>"+currentEvent.metadata+"</span>"+
									"<span style='position:relative;top:40px;'>area to display the preview of the entity</span>"+
								"</span>"+
							"</span>"+
						//form
							"<span style='position:absolute;left:20px;top:340px;'>"+
								formTable2
							"</span>"+
						//ending
							"</span>";
		$("#updateEvent").append(eventData);
		provideEditEventOnClickFunctionality();
	}
	function provideEditEventOnClickFunctionality(){
		$("#editEventFromText").datepicker();
		$("#editEventToText").datepicker();
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
function updateText(text){
	//alert(text);
	$("#abcdText").val(text);
}
//plus button was clicked. hide it. show minus button instead
function clickPlus(){	
	var mainButton = $('#togglePlusDiv');
	mainButton.css("display","none");
	$("#toggleMinusDiv").css("display","inline");
	//$("#area1").hover(function(e){alert("Hello");});
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

function hoverChange(control){
	control = $("#"+control+"Menu");
	$("[name=expandImage]").css("display","none");
	control.css("display","inline");
}
//mouse press was released. restore to plus icon and remove menu.
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
