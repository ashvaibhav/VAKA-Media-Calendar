package edu.usc.vakacalendar;

public class ButtonHandlersInterfaceForJavaScript implements ButtonHandler {
	private ButtonHandler curActivity;
	
	public ButtonHandlersInterfaceForJavaScript(
			AbstractButtonHandlerActivity curActivity) {
		this.curActivity = curActivity;
	}

	@Override
	public void onAudioButtonClick() {
		curActivity.onAudioButtonClick();
	}

	@Override
	public void onCameraButtonClick() {
		curActivity.onCameraButtonClick();
	}

	@Override
	public void onPhotoButtonClick() {
		curActivity.onPhotoButtonClick();
	}

	@Override
	public void onEventListClick() {
		curActivity.onEventListClick();
	}

	@Override
	public void onStopButtonClick() {
		curActivity.onStopButtonClick();
		
	}
	
	@Override
	public void onExit() {
		curActivity.onExit();
	}

}
