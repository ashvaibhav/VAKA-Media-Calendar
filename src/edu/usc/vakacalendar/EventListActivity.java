package edu.usc.vakacalendar;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class EventListActivity extends Activity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.activity_start);
		final Button captureButton = (Button) findViewById(R.id.Capture);
		captureButton.setOnClickListener(new OnClickListener() {
		    public void onClick(View v) {
		    	
		    }
		});
		final Button recordButton = (Button) findViewById(R.id.Record);
		recordButton.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				// TODO:
			}
		});

		// TODO Auto-generated method stub
	}

}
