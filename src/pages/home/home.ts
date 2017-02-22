import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map'

/**
 *
 * @home.ts
 * Date: Tuesday February 21st 2017
 * Author: Nicholas Rowlandson (200167125)
 * Description: This is all functionality for ionictodoapp frontend
 *
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // PROPERTIES
  toDos: FirebaseListObservable<any>;
  toDoLength: any;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    af:AngularFire) {
    this.toDos = af.database.list('/toDos');
    this.toDos.map(list=>list.length).subscribe(length=>this.toDoLength = length);
  }

  //METHODS
  // Add a to do. The folowing code will present a popup requesting input of to do name
  addToDo(){
    let prompt = this.alertCtrl.create({
      title: 'To Do Name',
      message: "Enter a name for this task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.toDos.push({
              title: data.title,
              done: false
            });
          }
        }
      ]
    });
    prompt.present();
  }

  //Remove to do from list.
  removeToDo(toDoId: string){
    this.toDos.remove(toDoId);
  }

  //Update the to do.
  updateToDo(toDoId, toDoTitle){
    let prompt = this.alertCtrl.create({
      title: 'To Do Name',
      message: "Update the name for this task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: toDoTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.toDos.update(toDoId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  //Update completed status when checkbox is clicked.
  updateStatus(toDoId, done){
    if(done == true){
      this.toDos.update(toDoId, {
        done: false
      });
    }else{
      this.toDos.update(toDoId, {
        done: true
      });
    }

  }

}
