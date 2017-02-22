import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // PROPERTIES
  toDos: FirebaseListObservable<any>;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    af:AngularFire) {
    this.toDos = af.database.list('/toDos');
  }

  // METHODS
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

  removeToDo(toDoId: string){
    this.toDos.remove(toDoId);
  }

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

  updateStatus(toDoId, done){
    console.log(done)
    console
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
