package edu.usc.vakacalendar;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.provider.MediaStore;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class AbstractButtonHandlerActivity extends Activity implements
		ButtonHandler {
	protected static final int ACTION_TAKE_PHOTO = 1;
	protected static final int ACTION_TAKE_VIDEO = 2;
	protected static final int ACTION_TAKE_AUDIO_EVENT = 3;

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
		startActivityForResult(takeVideoIntent, ACTION_TAKE_PHOTO);
	}

	public void onEventListClick() {
		Intent intent = new Intent(this, EventListActivity.class);
		startActivity(intent);
	}


	@Override
	public void onStopButtonClick() {
		finish();		
	}

}
