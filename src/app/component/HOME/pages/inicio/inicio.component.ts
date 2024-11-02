import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormsModule,CommonModule ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})


export class InicioComponent {
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
}
