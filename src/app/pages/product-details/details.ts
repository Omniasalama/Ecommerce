import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../../core/service/products';
import { Product } from '../../core/interface/products';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class Details implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(Products);

  product: Product | null = null;
  id!: string;
  currentImageIndex = 0;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const productId = params.get('id');
        if (productId) {
          this.id = productId;
          this.getProductById(this.id);
        }
      },
      error: (err) => {
        console.error('Error fetching route params', err);
      }
    });
  }

  getProductById(id: string): void {
    this.productService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res.data;
        
        this.currentImageIndex = 0;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  formatPriceInEGP(price: number | undefined): string {
    if (!price) return 'Price not available';
    
    // Format the price with Egyptian Pound symbol
    return `${price.toLocaleString('en-US')} EGP`;
  }

  getStarArray(rating: number): number[] {
    const stars = Math.floor(rating/5);
    return Array.from({ length: stars }, (_, i) => i);
  }

  addToCart(): void {
    if (this.product) {
      // Implement your add to cart logic here
      console.log('Adding to cart:', this.product);
    }
  }

 prevImage() {
  if (this.currentImageIndex > 0) {
    this.currentImageIndex--;
  }
}
nextImage() {
  if (this.product?.images && this.currentImageIndex < this.product.images.length - 1) {
    this.currentImageIndex++;
  }
}
}