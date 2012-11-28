package edu.usc.vakacalendar.commons;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MapService {
	private static final MapService instance = new MapService();

	public static MapService getInstance() {
		return instance;
	}

	private MapService() {

	}

	public String getSuggestions(String subString) {
		// stub used
		String[] suggestions = getSuggestionsStub(subString);
		return getJSONString(suggestions);
	}
	
	private String getJSONString(String[] suggestions){
		JSONArray jsonEventList = new JSONArray();
		for (String str : suggestions){
			JSONObject jsonSuggestion = new JSONObject();
			try {
				jsonSuggestion.put("suggestion", str);
			} catch (JSONException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
			jsonEventList.put(jsonSuggestion);
		}
		return jsonEventList.toString();
	}
	// STUB:
	private String[]  getSuggestionsStub(String subString){
		String[] suggestions = {"shop", "usc", "usc map"};
		String[] outputSuggestinos = new String[suggestions.length];
		int i = 0;
		for (String sg : suggestions){
			outputSuggestinos[i++] = subString + sg;
		}
		return outputSuggestinos;
	}
}
