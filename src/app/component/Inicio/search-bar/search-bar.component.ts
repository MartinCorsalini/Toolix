import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchControl = new FormControl('');
  categories = ['Electricista', 'Plomero', 'Peluquero'];
  filteredCategories: string[] = [];

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredCategories = this.categories.filter(category =>
        category.toLowerCase().includes(value?.toLowerCase() || '')
      );
    });
  }

  onSearch() {
    const query = this.searchControl.value;
    console.log('Búsqueda:', query); // Reemplaza esto con la lógica de búsqueda que desees
  }

  onInputChange() {
    const searchValue = this.searchControl.value?.toLowerCase() || '';
    this.filteredCategories = this.categories.filter(category =>
      category.toLowerCase().includes(searchValue)
    );
  }
}
