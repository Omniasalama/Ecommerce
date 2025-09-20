import { CategoriesService } from './../../core/service/categories-service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interface/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  allCat: Category[] = [];
  constructor(private AllCat:CategoriesService ) {}
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands() {
    this.AllCat.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.allCat = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
