package edu.usc.vakacalendar;

public class MapService {
	private static final MapService instance = new MapService();

	public static MapService getInstance() {
		return instance;
	}

	private MapService() {

	}

	public String getSuggestions(String subString) {
		// TODO: implement map search
		return "";
	}
}
