//user.service.ts
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "firebase/auth";
import {AppUser} from "@shared/models/app-user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
// Use this service to save and retrieve users from the database. All logic related to global information about users should be in this service. It helps with moulding the data to the shape we want. Here we define how en where we store and get the data in the database.
export class UserService {

  // Inject AngularFireDatabase to get access to the database API
  constructor(private db: AngularFireDatabase) { }


  // method is used in app.component.ts to save the user to the database when the user logs in
  // 'User' is a class from Firebase Authentication. It contains information about the user.
  // 'this' is used to refer to the current instance of the class. This class has only one instance, so the same database instance is used throughout the app.
  // 'object' is used to get a reference to a specific object in the database. The object() method takes a string argument that is the path to the object in the database.
  // 'update' is used to update the object in the database. The update() method takes an object as an argument. The object contains the properties to update.
  // 'then' is used to get a promise that is resolved when the update is completed successfully.
  // 'catch' is used to get a promise that is rejected when the update fails.
  save(user: User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
      .then(() => console.log('User saved successfully'))
      .catch(error => console.error('Error saving user:', error));
  }

  // method is used in admin-auth-guard.service.ts to get the user from the database
  // it needs a uid to get the user from the database, the type of uid is string, and the type of the return value is Observable<AppUser | null>. AppUser is a custom interface that we created in models/app-user.ts. There we defined the properties that we want to store in the database for each user(a model, or cookiecutter).
  // return the object from the database as an observable. The object() method takes a string argument that is the path to the object in the database.
  // 'valueChanges()' a method provided by AngularFire that returns an Observable. In Firebase, "value changes" is an event that occurs whenever the data at the specified database path changes. This method allows you to listen for changes in real-time.

  get(uid: string): Observable<AppUser | null> {
    return this.db.object('/users/' + uid).valueChanges() as Observable<AppUser | null>;
  }



}
