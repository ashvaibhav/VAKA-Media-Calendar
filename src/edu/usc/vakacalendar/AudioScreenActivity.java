package edu.usc.vakacalendar;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import edu.usc.vakacalendar.commons.BasicEvent;
import edu.usc.vakacalendar.commons.EventRecognizer;
import edu.usc.vakacalendar.commons.EventService;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.support.v4.app.NavUtils;

public class AudioScreenActivity extends AbstractButtonHandlerActivity {
	private static final String TAG = "VAKA";

	ButtonHandlersInterfaceForJavaScript buttonHandlersObj;
	private SpeechRecognizer mSpeechRecognizer;
	private Intent mRecognizerIntent;
	private EventRecognizer eventRecognizer;
	private EventService evnSrv = EventService.getInstance(); 

	
	private RecognitionListener mRecognitionListener = new RecognitionListener() {

		private String cunstructTextMessage(BasicEvent event) {
			Calendar c = Calendar.getInstance();
			c.setTime(event.getFrom());
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			SimpleDateFormat timeFormat = new SimpleDateFormat("h:mm a");
			StringBuilder message = new StringBuilder();
			message.append("Title: ").append(event.getTitle())
					.append("\nDate: ")
					.append(dateFormat.format(event.getFrom()))
					.append("\nTime: ")
					.append(timeFormat.format(event.getFrom()));
			return message.toString();
		}

		public void onRmsChanged(float rmsdB) {
			// TODO Auto-generated method stub

		}

		public void onResults(Bundle results) {
			Log.d(TAG, "onResults");
			String result;
			ArrayList<String> matches = results
					.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
			if ((matches != null) && (matches.size() >= 1)) {
				Log.d(TAG, "First result: " + matches.get(0));
				result = matches.get(0);
				Toast.makeText(getBaseContext(), result, Toast.LENGTH_SHORT)
						.show();
				BasicEvent event = eventRecognizer.recognize(result);
				EventService.getInstance().addEvent(event);				
				Toast.makeText(getBaseContext(), cunstructTextMessage(event), Toast.LENGTH_SHORT).show();
			} else {
				result = "No results";
				Toast.makeText(getBaseContext(), result, Toast.LENGTH_SHORT)
						.show();
			}
			finish();
		}

		public void onReadyForSpeech(Bundle params) {
			// TODO Auto-generated method stub
			
		}

		public void onPartialResults(Bundle partialResults) {
			// TODO Auto-generated method stub

		}

		public void onEvent(int eventType, Bundle params) {
			// TODO Auto-generated method stub

		}

		public void onError(int error) {
			// TODO Auto-generated method stub

		}

		public void onEndOfSpeech() {
			// TODO Auto-generated method stub

		}

		public void onBufferReceived(byte[] buffer) {
			// TODO Auto-generated method stub

		}

		public void onBeginningOfSpeech() {
			// TODO Auto-generated method stub

		}
	};

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_audio_screen);
        
        WebView webView = (WebView) findViewById(R.id.audioWebview);
		webView.setWebChromeClient(new WebChromeClient());
		WebSettings webSettings = webView.getSettings();
		webSettings.setJavaScriptEnabled(true);
		
		
		buttonHandlersObj = new ButtonHandlersInterfaceForJavaScript(
				this);
		webView.addJavascriptInterface(buttonHandlersObj, "ButtonHandlers");
		webView.addJavascriptInterface(evnSrv, "EventService");
		webView.loadUrl(getString(R.string.audio_activity_html_file_url));

		
		eventRecognizer = new EventRecognizer();
		Log.d(TAG,
				"speech recognition available: "
						+ SpeechRecognizer
								.isRecognitionAvailable(getBaseContext()));
		mSpeechRecognizer = SpeechRecognizer
				.createSpeechRecognizer(getBaseContext());
		mSpeechRecognizer.setRecognitionListener(mRecognitionListener);
		mRecognizerIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
		mRecognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
				RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
		mRecognizerIntent.putExtra("calling_package", "edu.usc.vakacalendar");
		mSpeechRecognizer.startListening(mRecognizerIntent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_audio_screen, menu);
        return true;
    }

    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }


	@Override
	public void onResume() {
		super.onResume();
		Log.d(TAG, "restarting speech recognition");
		mSpeechRecognizer.setRecognitionListener(mRecognitionListener);
		mSpeechRecognizer.startListening(mRecognizerIntent);
	}

	@Override
	public void onPause() {
		super.onPause();
		Log.d(TAG, "onPause: stopping speech recognition");
		cancelSpeechRecognition();
	}

	@Override
	public void onDestroy() {
		if (mSpeechRecognizer != null) {
			Log.d(TAG, "onDestroy: stopping listening");
			cancelSpeechRecognition();
			mSpeechRecognizer.destroy();
		}
		super.onDestroy();
	}

	private void cancelSpeechRecognition() {
		mSpeechRecognizer.stopListening();
		mSpeechRecognizer.cancel();
	}
}
