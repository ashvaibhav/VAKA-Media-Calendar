package edu.usc.vakacalendar.commons;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.Environment;
import android.util.Log;


public class EventService {
	private String eventsFileName = "Events.txt";
	private String runLogFileName = "RunLog.txt";
	private boolean isFirstStart;
	private boolean mExternalStorageAvailable = false;
	private boolean mExternalStorageWriteable = false;

	private static final EventService instance = new EventService();

	private List<BasicEvent> eventList = new LinkedList<BasicEvent>();

	public static EventService getInstance() {
		return instance;
	}

	private EventService() {
		loadAllEventsFromExternalFile();
		checkRunLog();
	}

	private void checkStorageAvailability() {
		String state = Environment.getExternalStorageState();
		if (Environment.MEDIA_MOUNTED.equals(state)) {
			// We can read and write the media
			mExternalStorageAvailable = mExternalStorageWriteable = true;
		} else if (Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
			// We can only read the media
			mExternalStorageAvailable = true;
			mExternalStorageWriteable = false;
		} else {
			mExternalStorageAvailable = mExternalStorageWriteable = false;
		}
	}

	private void checkRunLog() {
		checkStorageAvailability();
		if (mExternalStorageAvailable && mExternalStorageWriteable) {
			Environment.getExternalStorageDirectory();
			File file = new File(Environment.getExternalStorageDirectory(),
					runLogFileName);
			this.isFirstStart = false;
			try {
				DataInputStream dis = new DataInputStream(new FileInputStream(
						file));
				try {
					String runNumber = dis.readUTF();
					Log.d(this.getClass().getName(), "Run log read: \n"
							+ runNumber);
				} finally {
					dis.close();
				}
			} catch (FileNotFoundException e) {
				this.isFirstStart = true;
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				DataOutputStream dos = new DataOutputStream(
						new FileOutputStream(file));
				try {
					dos.writeUTF("1");
					Log.d(this.getClass().getName(), "Run log writen: \n"
							+ getAllEvents());
				} finally {
					dos.close();
				}
			} catch (FileNotFoundException e) {
				// Unable to create file, likely because external storage is not
				// currently mounted.
				Log.w("ExternalStorage", "Error writing " + file, e);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			Log.d(this.getClass().getName(),
					"External storage is not available: storage available: "
							+ mExternalStorageAvailable
							+ ", storage writable: "
							+ mExternalStorageWriteable);
		}
		return;
	}

	private void saveAllEventsFromExternalFile() {
		checkStorageAvailability();
		if (mExternalStorageAvailable && mExternalStorageWriteable) {
			Environment.getExternalStorageDirectory();

			File file = new File(Environment.getExternalStorageDirectory(),
					eventsFileName);

			try {
				DataOutputStream dos = new DataOutputStream(
						new FileOutputStream(file));
				try {
					dos.writeUTF(getAllEvents());
					Log.d(this.getClass().getName(), "Writen: \n"
							+ getAllEvents());
				} finally {
					dos.close();
				}
			} catch (FileNotFoundException e) {
				// Unable to create file, likely because external storage is not
				// currently mounted.
				Log.w("ExternalStorage", "Error writing " + file, e);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			Log.d(this.getClass().getName(),
					"External storage is not available: storage available: "
							+ mExternalStorageAvailable
							+ ", storage writable: "
							+ mExternalStorageWriteable);
		}
		return;
	}

	private void loadAllEventsFromExternalFile() {
		checkStorageAvailability();
		if (mExternalStorageAvailable && mExternalStorageWriteable) {
			Environment.getExternalStorageDirectory();

			File file = new File(Environment.getExternalStorageDirectory(),
					eventsFileName);

			try {
				DataInputStream dis = new DataInputStream(new FileInputStream(
						file));
				try {
					String events = dis.readUTF();
					Log.d(this.getClass().getName(), "Read: \n" + events);
					JSONArray jsonEventList;
					try {
						jsonEventList = new JSONArray(events);
						int eventListLenght = jsonEventList.length();
						for (int i = 0; i < eventListLenght; i++) {
							JSONObject jsonEvent = jsonEventList
									.getJSONObject(i);
							BasicEvent event = new BasicEvent(jsonEvent);
							eventList.add(event);
						}
					} catch (JSONException e) {
						e.printStackTrace();
					}

				} finally {
					dis.close();
				}

			} catch (FileNotFoundException e) {
				// Unable to create file, likely because external storage is not
				// currently mounted.
				Log.w("ExternalStorage", "Error writing " + file, e);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			Log.d(this.getClass().getName(),
					"External storage is not available: storage available: "
							+ mExternalStorageAvailable
							+ ", storage writable: "
							+ mExternalStorageWriteable);
		}
		return;
	}

	public String getAllEvents() {
		JSONArray jsonEventList = new JSONArray();
		for (BasicEvent basicEvent : eventList) {
			JSONObject jsonEvent = basicEvent.getJSONObject();
			jsonEventList.put(jsonEvent);
		}
		return jsonEventList.toString();
	}

	public void updateEvent(String id, String type, String from, String to,
			String title, String place, String description) {
		int updatedId = Integer.parseInt(id);
		//Calendar c = Calendar.getInstance();
		// from:
		long tineInMiliseconds = Long.parseLong(from);
		Date fromDate = new Date(tineInMiliseconds);
		// to:
		tineInMiliseconds = Long.parseLong(from);
		Date toDate = new Date(tineInMiliseconds);
		// metadata:
		Date metaDate = new Date(tineInMiliseconds);
		
		BasicEvent ev = new BasicEvent(updatedId);
		if (eventList.contains(ev)) {
			int location = eventList.indexOf(ev);
			BasicEvent evToUpdate = eventList.get(location);
			evToUpdate.setTitle(title);
			evToUpdate.setPlace(place);
			evToUpdate.setDescription(description);
			evToUpdate.setFrom(fromDate);
			evToUpdate.setTo(toDate);
			evToUpdate.setMetadata(metaDate);
		}
	}

	public String addEvent(BasicEvent newEv) {
		int newId = (eventList.size() == 0) ? 1 : (eventList.get(
				eventList.size() - 1).getId() + 1);
		newEv.setId(newId);
		eventList.add(newEv);
		saveAllEventsFromExternalFile();
		return String.valueOf(newId);
	}

	public void deleteEvent(String id) {
		int idToDelete = Integer.parseInt(id);
		BasicEvent ev = new BasicEvent(idToDelete);
		if (eventList.contains(ev)) {
			int location = eventList.indexOf(ev);
			eventList.remove(location);
		}
		saveAllEventsFromExternalFile();
	}

	public boolean isFirstStart() {
		return isFirstStart;
	}

	public boolean isEmprtyList() {
		return eventList.isEmpty();
	}

}