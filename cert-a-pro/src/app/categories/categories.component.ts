import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import{ Database, ref} from "@angular/fire/database"
import { onValue } from 'firebase/database';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection }  from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoriesComponent {
  categories: Observable<CategoryWithId[]> ;

  constructor(private readonly firestore: Firestore){
    const categoriesCollection = collection(this.firestore, 'categories');
    this.categories = collectionData(categoriesCollection, { idField: 'id' }) as Observable<CategoryWithId[]>;
  }
}

export interface Category {
  title: string;
  image: string;
}

export interface CategoryWithId extends Category {
  id: string;
}