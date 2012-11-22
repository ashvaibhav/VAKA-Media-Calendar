package edu.usc.vakacalendar;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class EventListActivity extends AbstractButtonHandlerActivity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_event_list);
		
		WebView webView = (WebView) findViewById(R.id.eventListWebview);
		webView.setWebChromeClient(new WebChromeClient());
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);

		webView.loadUrl("file:///android_asset/html/startActivity.html");
		ButtonHandlersInterfaceForJavaScript buttonHandlersObj = new ButtonHandlersInterfaceForJavaScript(
				this);
		webView.addJavascriptInterface(buttonHandlersObj, "ButtonHandlers");
		EventService evnSrv = EventService.getInstance();
		webView.addJavascriptInterface(evnSrv, "EventService");
	}

}
