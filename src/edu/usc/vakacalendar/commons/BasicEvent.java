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

	public BasicEvent() {
	}

	public BasicEvent(int id, String type, Date from, Date to, Date metadata,
			String title, String place, String description) {
		this.id = id;
		this.type = type;
		this.from = from;
		this.metadata = metadata;
		this.to = to;
		this.title = title;
		this.place = place;
		this.description = description;
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
	}

	public BasicEvent(JSONObject jsonEvent) throws JSONException {

		this.id = jsonEvent.getInt("id");
		this.type = jsonEvent.getString("type");
		// from:
		String dateInMiliseconds = jsonEvent.getString("from");
		Long tineInMiliseconds = (dateInMiliseconds.compareTo("") == 0) ? null
				: Long.parseLong(dateInMiliseconds);
		if (tineInMiliseconds != null)
			this.from = new Date(tineInMiliseconds);
		// to:
		dateInMiliseconds = jsonEvent.getString("to");
		tineInMiliseconds = (dateInMiliseconds.compareTo("") == 0) ? null
				: Long.parseLong(dateInMiliseconds);
		if (tineInMiliseconds != null)
			this.to = new Date(tineInMiliseconds);
		// metadata:
		dateInMiliseconds = jsonEvent.getString("metadata");
		tineInMiliseconds = (dateInMiliseconds.compareTo("") == 0) ? null
				: Long.parseLong(dateInMiliseconds);
		if (tineInMiliseconds != null)
			this.metadata = new Date(tineInMiliseconds);

		this.title = jsonEvent.getString("title");
		this.place = jsonEvent.getString("place");
		this.description = jsonEvent.getString("place");
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
		} catch (JSONException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return jsonEvent;
	}
}
