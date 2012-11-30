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
		startActivityForResult(takeVideoIntent, ACTION_TAKE_VIDEO);
	}

	public void onPhotoButtonClick() {
		Intent takeVideoIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		String mediaURL = getURI();
		takeVideoIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.parse(mediaURL));
		startActivityForResult(takeVideoIntent, ACTION_TAKE_PHOTO);
		BasicEvent event = new BasicEvent();
		event.setType(BasicEvent.PHOTO);
		event.setMediaURL(getMediaURL());
		event.setMetadata(Calendar.getInstance().getTime());
		evnSrv.addEvent(event);
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

	
	private String getURI(){
		return "file://" +getMediaURL();
	}
	
	private String getMediaURL(){
		return Environment.getExternalStorageDirectory().getAbsolutePath() + "/VAKA_note_" + evnSrv.getNextId() + ".jpg";
	}
}
