package edu.usc.vakacalendar;

public class ButtonHandlersInterfaceForJavaScript {
	
	private StartActivity curActivity;
	
	public ButtonHandlersInterfaceForJavaScript(StartActivity curActivity){
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
