package edu.usc.vakacalendar;

public interface ButtonHandler {

	public void onAudioButtonClick();

	public void onCameraButtonClick();

	public void onPhotoButtonClick();

	public void onEventListClick();
	
	public void onStopButtonClick();

	public void onPlay(String url);
	
	public void onStopPlay();
	
	public void onExit();
	
	
}
