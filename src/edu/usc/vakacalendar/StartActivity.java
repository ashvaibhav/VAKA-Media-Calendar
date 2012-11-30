package edu.usc.vakacalendar;

import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class StartActivity extends AbstractButtonHandlerActivity {
	ButtonHandlersInterfaceForJavaScript buttonHandlersObj; 
//	EventService evnSrv = EventService.getInstance(); 
//	MapService mapSrv = MapService.getInstance(); 
	
	
	private void refreshPage(){		
		WebView webView = (WebView) findViewById(R.id.startWebview);
		webView.loadUrl(getString(R.string.start_activity_html_file_url));
	}
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
	    if (keyCode == KeyEvent.KEYCODE_BACK ) {
	    	WebView webView = (WebView) findViewById(R.id.startWebview);
	    	webView.loadUrl("javascript:(function () { " + "goBack();" + "})()");
	        return true;
	    }
	    return super.onKeyDown(keyCode, event);
	};
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.activity_start);
		buttonHandlersObj = new ButtonHandlersInterfaceForJavaScript(
				this);
		WebView webView = (WebView) findViewById(R.id.startWebview);
		webView.setWebChromeClient(new WebChromeClient());
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		
		webView.addJavascriptInterface(buttonHandlersObj, "ButtonHandlers");
		webView.addJavascriptInterface(evnSrv, "EventService");
		webView.addJavascriptInterface(mapSrv, "MapService");

		refreshPage();
	}
	
	@Override
	protected void onRestart() {
		super.onRestart();
		refreshPage();
	}

}
