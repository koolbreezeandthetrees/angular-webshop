//category.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { Category } from "../../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Category[]> {
    return this.db.list('/categories').valueChanges() as Observable<Category[]>;
  }

}
