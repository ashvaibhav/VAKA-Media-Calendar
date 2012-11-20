package edu.usc.vakacalendar;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class StartActivity extends AbstractButtonHandlerActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_start);

		WebView webView = (WebView) findViewById(R.id.startWebview);
		webView.setWebChromeClient(new WebChromeClient());
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		webView.loadUrl("file:///android_asset/html/startActivity.html");
		ButtonHandlersInterfaceForJavaScript buttonHandlersObj = new ButtonHandlersInterfaceForJavaScript(
				this);
		webView.addJavascriptInterface(buttonHandlersObj, "ButtonHandlers");
		EventService evnSrv = new EventService();
		webView.addJavascriptInterface(evnSrv, "EventService");
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	    if (resultCode == Activity.RESULT_OK && requestCode == ACTION_TAKE_AUDIO_EVENT ) {
	        // Perform a query to the contact's content provider for the contact's name
	        data.getData();
	    }
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.activity_start, menu);
		return true;
	}
}
