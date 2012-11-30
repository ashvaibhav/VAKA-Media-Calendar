package edu.usc.vakacalendar.commons;

import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

public class BasicEvent {

	public static final String AUDIO = "audio";
	public static final String VIDEO = "video";
	public static final String PHOTO = "photo";
	public static final String NOTE = "note";

	private int id;
	private String type;
	private Date from;
	private Date to;
	private Date metadata;
	private String title;
	private String description;
	private String place;
	private String mediaURL;

	public BasicEvent() {
	}

	public BasicEvent(int id) {
		this.id = id;
		this.type = NOTE;
		this.from = null;
		this.metadata = null;
		this.to = null;
		this.title = "";
		this.place = "";
		this.description = "";
		this.mediaURL = "";
	}

	public BasicEvent(JSONObject jsonEvent) throws JSONException {
		Long timeInMiliseconds;

		this.id = jsonEvent.getInt("id");
		this.type = jsonEvent.getString("type");
		// from:
		String dateInMiliseconds = jsonEvent.getString("from");
		if (dateInMiliseconds.compareTo("") != 0) {
			timeInMiliseconds = Long.parseLong(dateInMiliseconds);
			this.from = new Date(timeInMiliseconds);
		}
		// to:
		dateInMiliseconds = jsonEvent.getString("to");
		if (dateInMiliseconds.compareTo("") != 0) {
			timeInMiliseconds = Long.parseLong(dateInMiliseconds);
			this.to = new Date(timeInMiliseconds);
		}
		// metadata:
		dateInMiliseconds = jsonEvent.getString("metadata");
		if (dateInMiliseconds.compareTo("") != 0) {
			timeInMiliseconds = Long.parseLong(dateInMiliseconds);
			this.metadata = new Date(timeInMiliseconds);
		}
		this.title = jsonEvent.getString("title");
		this.place = jsonEvent.getString("place");
		this.description = jsonEvent.getString("place");
		this.mediaURL = jsonEvent.getString("mediaURL");
	}

	public JSONObject getJSONObject() {
		JSONObject jsonEvent = new JSONObject();
		try {
			jsonEvent.put("id", getId());
			jsonEvent.put("type", ((getType() == null) ? "" : getType()));
			jsonEvent.put("title", ((getTitle() == null) ? "" : getTitle()));
			jsonEvent.put("from",
					(getFrom() == null ? "" : getFrom().getTime()));
			jsonEvent.put("to", (getTo() == null ? "" : getTo().getTime()));
			jsonEvent.put("metadata", (getMetadata() == null ? ""
					: getMetadata().getTime()));
			jsonEvent.put("place", (getPlace() == null ? "" : getPlace()));
			jsonEvent.put("description", (getDescription() == null ? ""
					: getDescription()));
			jsonEvent.put("mediaURL", (getMediaURL() == null ? ""
					: getMediaURL()));
		} catch (JSONException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return jsonEvent;
	}
	
	public Date getMetadata() {
		return metadata;
	}

	public void setMetadata(Date metadata) {
		this.metadata = metadata;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	
	public String getMediaURL() {
		return mediaURL;
	}

	public void setMediaURL(String mediaURL) {
		this.mediaURL = mediaURL;
	}

	@Override
	public boolean equals(Object o) {
		if (o instanceof BasicEvent) {
			BasicEvent ev = (BasicEvent) o;
			if (ev.id == this.id)
				return true;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.id;
	}

	
}
