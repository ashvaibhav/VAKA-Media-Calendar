package edu.usc.vakacalendar;

import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.usc.vakacalendar.commons.BasicEvent;

public class EventService {

	private List<BasicEvent> eventList = new LinkedList<BasicEvent>();

	public EventService() {
		Calendar c = Calendar.getInstance();
		for (int i = 0; i < 3; i++) {
			BasicEvent ev = new BasicEvent(i, BasicEvent.AUDIO, c.getTime(), c.getTime(),
					"Title: # " + i, "Los Angeles", "Test description # " + i);
			eventList.add(ev);
		}
	}

	public String getAllEvents() {
		JSONArray jsonEventList = new JSONArray();
		try {
			for (BasicEvent basicEvent : eventList) {
				JSONObject jsonEvent = new JSONObject();
				jsonEvent.put("id", basicEvent.getId());
				jsonEvent.put("type", basicEvent.getType());
				jsonEvent.put("title", basicEvent.getTitle());
				jsonEvent.put("from", "3:30PM on 11/21/2012");
				jsonEvent.put("to", "4:30PM on 11/21/2012");
				jsonEvent.put("place", basicEvent.getPlace());
				jsonEvent.put("description", basicEvent.getDescription());
				jsonEventList.put(jsonEvent);
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonEventList.toString();
	}
}