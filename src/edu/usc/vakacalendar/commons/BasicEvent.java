package edu.usc.vakacalendar.commons;

import java.util.Date;

public class BasicEvent {
	private Date from;
	private Date to;
	private String title;
	private String description;
	
	public BasicEvent() {
	}
	

	public BasicEvent(Date from, Date to, String title, String description) {
		this.from = from;
		this.to = to;
		this.title = title;
		this.description = description;
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
	
	
}
