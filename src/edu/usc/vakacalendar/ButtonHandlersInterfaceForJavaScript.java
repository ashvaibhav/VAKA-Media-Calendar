package edu.usc.vakacalendar;

public class ButtonHandlersInterfaceForJavaScript {
	
	private ButtonHandler curActivity;
	
	public ButtonHandlersInterfaceForJavaScript(ButtonHandler curActivity){
		this.curActivity = curActivity;
	}
	
	public void onAudiotButtonClick() {
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
