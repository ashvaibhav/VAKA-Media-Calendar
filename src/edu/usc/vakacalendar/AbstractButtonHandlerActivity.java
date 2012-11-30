package edu.usc.vakacalendar;

import java.util.Calendar;

import edu.usc.vakacalendar.commons.BasicEvent;
import edu.usc.vakacalendar.commons.EventService;
import edu.usc.vakacalendar.commons.MapService;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;

public class AbstractButtonHandlerActivity extends Activity implements
		ButtonHandler {
	protected static final int ACTION_TAKE_PHOTO = 1;
	protected static final int ACTION_TAKE_VIDEO = 2;
	protected static final int ACTION_TAKE_AUDIO_EVENT = 3;

	protected EventService evnSrv = EventService.getInstance(); 
	protected MapService mapSrv = MapService.getInstance(); 
	
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

	}

	public void onAudioButtonClick() {
		Intent intent = new Intent(this, AudioScreenActivity.class);
		startActivityForResult(intent, ACTION_TAKE_AUDIO_EVENT);
	}

	public void onCameraButtonClick() {
		Intent takeVideoIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
		takeVideoIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.parse(getURI(BasicEvent.VIDEO)));
		startActivityForResult(takeVideoIntent, ACTION_TAKE_VIDEO);
		addEvent(BasicEvent.VIDEO);
	}

	public void onPhotoButtonClick() {
		Intent takePhotoIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		takePhotoIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.parse(getURI(BasicEvent.PHOTO)));
		startActivityForResult(takePhotoIntent, ACTION_TAKE_PHOTO);
		addEvent(BasicEvent.PHOTO);
	}

	public void onEventListClick() {
		Intent intent = new Intent(this, EventListActivity.class);
		startActivity(intent);
	}

	@Override
	public void onStopButtonClick() {
		finish();
	}

	@Override
	public void onExit() {
		finish();
	}

	private void addEvent(String type){
		BasicEvent event = new BasicEvent();
		event.setType(type);
		event.setMediaURL(getMediaURL(type));
		event.setMetadata(Calendar.getInstance().getTime());
		evnSrv.addEvent(event);
	}
	
	private String getURI(String type){
		return "file://" +getMediaURL(type);
	}
	
	private String getMediaURL(String type){
		return Environment.getExternalStorageDirectory().getAbsolutePath() + "/VAKA_note_" + evnSrv.getNextId() + (type.compareTo(BasicEvent.PHOTO) == 0 ? ".jpg" : ".3gp");
	}
}
