import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Firestore, collection, collectionData, query, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'; // Import the map operator

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  categories$: Observable<Category[]>;

  constructor(
    private readonly firestore: Firestore,
    private router: Router
  ) {
    const categoriesCollection = collection(this.firestore, 'category_array');
    const categoriesQuery = query(categoriesCollection);

    this.categories$ = collectionData(categoriesQuery).pipe(
      map((data: any[]) => {
        return data[0].categories;
      })
    );
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/certifications', categoryId]);
  }
}

export interface Category {
  id: string;
  title: string;
  image: string;
  active: boolean;
}
