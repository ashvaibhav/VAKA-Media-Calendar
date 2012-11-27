package edu.usc.vakacalendar;

import java.io.File;

import android.os.Bundle;
import android.os.Environment;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class StartActivity extends AbstractButtonHandlerActivity {
	ButtonHandlersInterfaceForJavaScript buttonHandlersObj; 
	EventService evnSrv = EventService.getInstance(); 
	MapService mapSrv = MapService.getInstance(); 
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
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
	protected void onRestart() {
		super.onRestart();
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
	
}
