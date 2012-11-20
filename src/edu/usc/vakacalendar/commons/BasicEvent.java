package edu.usc.vakacalendar.commons;

import java.util.Date;

public class BasicEvent {

	public static final int AUDIO = 1;
	public static final int VIDEO = 2;
	public static final int PHOTO = 3;

	private int id;
	private int type;
	private Date from;
	private Date to;
	private String title;
	private String description;
	private String place;

	public BasicEvent() {
	}

	public BasicEvent(int id, int type, Date from, Date to, String title,
			String place, String description) {
		this.id = id;
		this.type = type;
		this.from = from;
		this.to = to;
		this.title = title;
		this.place = place;
		this.description = description;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
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

}
