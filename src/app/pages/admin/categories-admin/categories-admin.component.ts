import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {

  categories: any[] = [];

  showModal = false;
  newCategoryName = '';

  successMessage = '';
  errorMessage = '';

  loading = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // LOAD ALL
  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement catégories :', err);
        this.errorMessage = 'Impossible de charger les catégories.';
        this.loading = false;
      }
    });
  }

  // OPEN MODAL
  openCategoryModal(): void {
    this.showModal = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // CLOSE MODAL
  closeCategoryModal(): void {
    this.showModal = false;
    this.newCategoryName = '';
  }

  // CREATE CATEGORY
  createCategory(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.newCategoryName.trim()) {
      this.errorMessage = 'Category name is required.';
      return;
    }

    this.categoryService.createCategory({
      name: this.newCategoryName
    }).subscribe({
      next: (res) => {
        this.successMessage = 'Category created successfully.';
        this.closeCategoryModal();
        this.loadCategories();
      },
      error: (err) => {
        console.error('Erreur création catégorie :', err);

        if (err?.error?.errors) {
          const messages = Object.values(err.error.errors).flat().join(' | ');
          this.errorMessage = messages;
        } else {
          this.errorMessage = 'Create failed.';
        }
      }
    });
  }

  // DELETE CATEGORY
  deleteCategory(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this category?');
    if (!confirmed) return;

    this.successMessage = '';
    this.errorMessage = '';

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted successfully.';
        this.categories = this.categories.filter(c => c.id !== id);
      },
      error: (err) => {
        console.error('Erreur suppression catégorie :', err);
        this.errorMessage = 'Delete failed.';
      }
    });
  }

}