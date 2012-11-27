package edu.usc.vakacalendar;

public class ButtonHandlersInterfaceForJavaScript implements ButtonHandler {
	private ButtonHandler curActivity;
	
	public ButtonHandlersInterfaceForJavaScript(
			AbstractButtonHandlerActivity curActivity) {
		this.curActivity = curActivity;
	}

	public void onAudioButtonClick() {
		curActivity.onAudioButtonClick();
	}

	public void onCameraButtonClick() {
		curActivity.onCameraButtonClick();
	}

	public void onPhotoButtonClick() {
		curActivity.onPhotoButtonClick();
	}

	public void onEventListClick() {
		curActivity.onEventListClick();
	}

	@Override
	public void onStopButtonClick() {
		curActivity.onStopButtonClick();
		
	}

}
