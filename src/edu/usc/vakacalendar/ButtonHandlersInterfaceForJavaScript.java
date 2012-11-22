package edu.usc.vakacalendar;

public class ButtonHandlersInterfaceForJavaScript {
	private ButtonHandler curActivity;
	
	public ButtonHandlersInterfaceForJavaScript(
			AbstractButtonHandlerActivity curActivity) {
		this.curActivity = curActivity;
	}

	
	public void onAudioButtonClick() {
		curActivity.onAudiotButtonClick();
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
}
