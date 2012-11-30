//ButtonHandlers.onPlay('"+currentEvent.mediaURL+"');
//ButtonHandlers.onStopPlay();
//Global Variables
var debug = true;
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
				case "1":
					status = "unapproved";break;
				case "2":
					status = "approved";break;
			}
		}
		else{
			data["status"] = "1";
			status = "unapproved";
		}
		if(!type)type=data.type;
		if(!status)status=data.status;
		$("#eventList").append("<div id='eventListComplete'></div>");
		if(data.status!=3){	//if item is not deleted, display it
			var response = populateOneEvent(data.id, data.title, data.from, data.metadata, type, status);//id, type, title, from ,to ,place , description,
			$('#eventListComplete').append(response);
		}
	}
}
//getting data from Android about all events
function getDataForAllEvents(){
var result = "";
if(!debug)
	result = EventService.getAllEvents();
else
	result = '['+
				'{"id":"1","title":"This audio meeting 1 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"audio","metadata":"stored info about meeting","status":"1", "mediaURL":"/storage/emulated/0/VAKA_audio001.3gp"},'+
				'{"id":"2","title":"This video works in alex machine", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"video","metadata":"stored info about meeting","status":"1", "mediaURL":"/storage/emulated/0/qwe.3gp"},'+
				'{"id":"3","title":"This photo is nice", "from":"some date", "to":"some other date at", "place":"Los Angeles", 								   "type":"photo","metadata":"stored info about meeting","status":"1","description":"'+				   
				
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
									"asddhg alidsh gpidh gqp hgiade hgiahgpoiah aiphgipa ghiad hgdgh aish"+
				'", "mediaURL":"/storage/emulated/0/123.jpg"},'+
				'{"id":"4","title":"This hangout meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"audio","metadata":"stored info about meeting","status":"1","mediaURL":"/storage/emulated/0/hangout_ringtone.ogg"},'+
				'{"id":"5","title":"This song we will love", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"audio","metadata":"stored info about meeting","status":"1","mediaURL":"file.mp3"},'+
				'{"id":"6","title":"This mp3 meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"audio","metadata":"stored info about meeting","status":"1","mediaURL":"/storage/emulated/0/asd.mp3"},'+
				'{"id":"7","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":"video","metadata":"stored info about meeting","status":"1","mediaURL":"/storage/emulated/0/asd.mp3"},'+
				'{"id":"8","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting","status":"1"},'+
				'{"id":"9","title":"This meeting 2 is supposed to happen", "from":"some date", "to":"some other date at", "place":"Los Angeles", "description":"about the meeting","type":1,"metadata":"stored info about meeting","status":"1"}'+
			 ']';
result = JSON.parse(result);
dataForAllEvents = result;	
	//return "We plan to meet... :3-30 PM on 10/30... :25 Oct at 1...:audio, another event:trying to get it:figured out:video";	
}
//displaying one event data in EventList html page
function populateOneEvent(id, title, date, metadata, type, status, control){
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
 					eventItem += "<span id='editEventTitle"+id+"' style='position:absolute;top:50px;left:200px;width:450px;'>"+title+"</span>"; 
 					eventItem += "<HR style='position:absolute;top:70px;left:200px; width:450px;'/>";
 					eventItem += "<span id='editEventFrom"+id+"' style='position:absolute;top:90px;left:200px;width:450px;'>"+date+"</span>";
 					eventItem += "<HR style='position:absolute;top:110px;left:200px; width:450px;'/>"; 			 			
 					eventItem += "<span class='previewMetadata' style='position:absolute;top:130px;left:200px;width:450px;'><img src='images/eventList/"+type+"_icon_s.png'></span>"; 			 			
 					eventItem += "<span class='previewMetadataContent' style='position:absolute;top:130px;left:240px;width:450px;'>"+metadata+"</span>"+"</span>";
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
 		//$("#eventList").append(eventItem);
		return eventItem;
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
			break;
		}		
	}
	if(!debug)
		EventService.updateEvent(currentEvent.id, currentEvent.type, currentEvent.from, currentEvent.to, currentEvent.title, currentEvent.place, currentEvent.description);
 }
function updateEventList(){
	//toggle Approval Icon status			taken care of in toggleApproval() funciton
	
	//toggle meeting title	
	$("#editEventTitle"+currentEvent.id).empty().append(currentEvent.title);
	//toggle meeting from date
	$("#editEventFrom"+currentEvent.id).empty().append(currentEvent.from);
}
function updateEditedState(){
	currentEvent.title = $("#editEventTitle").val();
	currentEvent.from = $("#editEventFromText").val();
	currentEvent.to = $("#editEventToText").val();
	currentEvent.place = $("#editEventPlaceText").val();
	currentEvent.status = "1";
//(((document.getElementById("editEventStatus").getAttribute("src")).split("calendar_btn")[1]).split(".png")[0]);//$("#editEventStatus").attr("src");
	currentEvent.description = $("#description"+currentEvent.id).val();
	updateEventList();
	updateEventListWithCurrentEvent();		
	//alert(currentEvent.status);
}
 function collapseEditEvent(){
		updateEditedState();
 		$("#edit_screen").hide();
/*		$("#editEventForm"+currentEvent.id).hide();
		$("#description"+currentEvent.id).parent().parent().empty();*/
 		$("#main_screen").show();
 		//deleting data
 		$("#updateEvent").empty();
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
	var response = confirm("Do you want to delete it?");
	if(response){
 	updateCurrentEvent(id);
 	currentEvent.status = "3";
 	$("#eventItem"+id).css("display","none"); 	
 	if(fromEditPage){
 		collapseEditEvent();
 	} 	
 	else
 		updateEventListWithCurrentEvent();
	}
 }
 function toggleApproval(id, fromEditPage){
 	updateCurrentEvent(id);
 	//toggle the status 	
 	switch(currentEvent.status){
 		case "1":
 			currentEvent.status = "2";break;
 		case "2":
 			currentEvent.status = "1";break;
 	}
 	var eventItem = "";
 	if(currentEvent.status)
 			eventItem += "<img src='images/eventList/check_box"+currentEvent.status+".png'></span>";
 	else{
 			eventItem += "<img src='images/eventList/check_box1.png'></span>";
			currentEvent.status="1";
	}
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
 function goBack(){
 	reset();
 	collapseEditEvent();
 }
 function reset(){
	var response = confirm("Do you want to reset to default?");
	if(response){
 	$("#editEventReset").empty().append("<img src='images/editEvent/undo_btn1.png'/>");
	currentEvent = initialStateOfEvent;
	updateEventListWithCurrentEvent();
	$("#updateEvent").empty();
	editEvent(currentEvent.id, true);
	}
 }
function getMediaType(ext){
	var response = "";
	switch(ext){
		case "ogg":
		case "oga":
				response = "ogg";	break;
		case "m4a":
				response = "mp4";	break;
		case "mp3":
				response = "mpeg";	break;
		case "webma":
				response = "webm";	break;
		case "3gp":
				response = "3gpp";	break;
		default:
				response = ext; 
	}
	return response;
}
function showPreview(){
	var item = "";
	item +=
			"<span class='preview' title='preview'>"+
				"<span class='previewMetadata'>"+
					"<img src='images/eventList/"+currentEvent.type+"_icon_s.png'/>"+
					"<span class='previewMetadataContent' style='width:500px;'>"+currentEvent.metadata+"</span>"+
					"<span>";// style='position:relative;top:40px;'>";
	switch(currentEvent.type){
		case 'audio':
			item += /*"<audio class='posAbs' style='top:-270px;' width='600px' height='400' src='"+currentEvent.mediaURL+"'>"+
    					"<p>Your browser does not support the audio element</p>"+
				"</audio>";*/
				"<audio class='posAbs' style='top:270px;' width='600px' height='400' controls='controls'>"+
				"<source src='"+currentEvent.mediaURL+"' type='audio/"+getMediaType(currentEvent.mediaURL.split(".")[1])+"'>"+
				"<P>Your browsr does not support the audio element</P>"+
				"</audio>";alert(currentEvent.mediaURL);
			break;
		case 'video':
			item +=	"<video class='posAbs' style='top:-270px;' width='600px' height='400' controls='controls'>"+
				"<source src='"+currentEvent.mediaURL+"' type='video/"+getMediaType(currentEvent.mediaURL.split(".")[1])+"'>"+
				"Your browser does not support the video tag."+
				"</video>";
			break;
		case 'photo':
			item += "<img class='posAbs' style='top:0px;' width='620px' height='150' src='"+currentEvent.mediaURL+"'/>";
			break;
		case 'note':alert('note');break;
		default: alert("You associated some strange media with this event.");break;
	}
	item += "</span>"+
				"</span>"+
			"</span>";
	return item;
}
 function datePicker(control){
	$("#editEvent"+control+"Text").datepicker("show");//editEventFrom
 	//alert("Date Picker under contruction - check ol js src");
 }
 function mapPicker(){
	var dropDown = "<input class='editEventTextBoxContent editEventTextBoxStyle editEventDropDown' type='text'/>";
	//$("span[name=place]").append(dropDown);
	$("#EditEventPlaceText").append(dropDown);
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
							"<input disabled='disabled' id='editEventFromText' type='text' class='posAbs from editEventTextBox editEventTextBoxContent editEventTextBoxStyle' value='"+currentEvent.from+"'/>"+
							"<span id='editEventFrom' onClick='javascript:datePicker(\"From\");'><img class='posAbs from editEventTextButton ' src='images/editEvent/calendar_picker.png'/></span>"+
						"</span>"+
						"<span name='to'>"+
							"<span class='posAbs to editEventHead'>"+
									"To"+
							"</span>"+
//							"<span class='posAbs to editEventTextBox editEventTextBoxContent editEventTextBoxStyle'>"+
//									currentEvent.to+
//							"</span>"+
							"<input disabled='disabled' id='editEventToText' type='text' class='posAbs to editEventTextBox editEventTextBoxContent editEventTextBoxStyle' value='"+currentEvent.to+"'/>"+
							"<span id='editEventTo' onClick='javascript:datePicker(\"To\");'><img class='posAbs to editEventTextButton' src='images/editEvent/calendar_picker.png'/></span>"+
						"</span>"+
						"<span name='place'>"+
							"<span class='posAbs place editEventHead '>"+
									"Place"+
							"</span>"+
							"<span id='EditEventPlaceText' class='posAbs place editEventTextBox editEventTextBoxContent editEventTextBoxStyle'>"+
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
								"<img id='editEventStatus' value="+currentEvent.status+" src='images/editEvent/calendar_btn"+currentEvent.status+".png'/>"+
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
							showPreview()+
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
function mainExpand(){
	//change the div from compressed to expansion
	//
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
var tempCounter = 0;
function hoverChange(control){
	if(control){
		updateText(control.target.id +tempCounter++);
		control = $("#"+control+"Menu");
		if(control){
			$("[name=expandImage]").css("display","none");
			control.css("display","inline");
		}
	}
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
function updateAudioTimer(){
	audioTimer++;
	$("#audioTimer").html(audioTimer);
	if(audioTimer<15)
//		setInterval(updateAudioTimer(),1000);
		audioTimerCountUp = setTimeout('updateAudioTimer()', 1000);
	else
		audioRecordingStopClicked();		
}
function audioRecordingStart(){
	//startTimer
	audioTimer = -1;
	audioTimerCountUp = setTimeout(updateAudioTimer(),1000);
}
function audioRecordingStopClicked(){
	//stop timer
	clearTimeout(audioTimerCountUp);
	//hide stop button
	$("#audioStopIcon").hide();
	//destroy audio recording activity
	ButtonHandlers.onStopButtonClick();
}