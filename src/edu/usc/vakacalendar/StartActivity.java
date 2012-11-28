package edu.usc.vakacalendar;


import edu.usc.vakacalendar.commons.EventService;
import edu.usc.vakacalendar.commons.MapService;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class StartActivity extends AbstractButtonHandlerActivity {
	ButtonHandlersInterfaceForJavaScript buttonHandlersObj; 
	EventService evnSrv = EventService.getInstance(); 
	MapService mapSrv = MapService.getInstance(); 
	
	private void refreshPage(){
		setContentView(R.layout.activity_start);
		
		WebView webView = (WebView) findViewById(R.id.startWebview);
		webView.setWebChromeClient(new WebChromeClient());
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		buttonHandlersObj = new ButtonHandlersInterfaceForJavaScript(
				this);
		webView.addJavascriptInterface(buttonHandlersObj, "ButtonHandlers");
		webView.addJavascriptInterface(evnSrv, "EventService");
		webView.addJavascriptInterface(mapSrv, "MapService");
		webView.loadUrl(getString(R.string.start_activity_html_file_url));
	}
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		refreshPage();
	}
	
	@Override
	protected void onRestart() {
		super.onRestart();
		refreshPage();
	}
	

	
}
