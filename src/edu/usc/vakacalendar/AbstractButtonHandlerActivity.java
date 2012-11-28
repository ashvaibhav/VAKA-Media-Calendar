package edu.usc.vakacalendar;

import java.io.IOException;

import android.app.Activity;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.provider.MediaStore;

public class AbstractButtonHandlerActivity extends Activity implements
		ButtonHandler {
	protected static final int ACTION_TAKE_PHOTO = 1;
	protected static final int ACTION_TAKE_VIDEO = 2;
	protected static final int ACTION_TAKE_AUDIO_EVENT = 3;
	private MediaPlayer mediaPlayer;

	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		if (mediaPlayer == null) {
			mediaPlayer = new MediaPlayer();
			mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
		}
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

	@Override
	public void onPlay(String path) {
		try {
			mediaPlayer.setDataSource(path);
			mediaPlayer.prepare();
			mediaPlayer.start();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		mediaPlayer.start();
	}

	@Override
	public void onStopPlay() {
		mediaPlayer.stop();
		mediaPlayer.release();
	}

}
