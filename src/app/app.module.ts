import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

/**
 *
 * @app.module.ts
 * Date: Tuesday February 21st 2017
 * Author: Nicholas Rowlandson (200167125)
 * Description: This is the app.module for ionictodoapp
 *
*/

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyChFPHjNMMO8ram-u0sH4Pl6BNeEH77eWw",
  authDomain: "ionictodoapp-2256d.firebaseapp.com",
  databaseURL: "https://ionictodoapp-2256d.firebaseio.com",
  storageBucket: "ionictodoapp-2256d.appspot.com",
  messagingSenderId: "292831515831"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
