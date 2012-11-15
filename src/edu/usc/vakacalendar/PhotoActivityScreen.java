package edu.usc.vakacalendar;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

public class PhotoActivityScreen extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo_activity_screen);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_photo_activity_screen, menu);
        return true;
    }
}
