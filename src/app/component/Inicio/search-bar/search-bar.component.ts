import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchControl = new FormControl('');
  showSuggestions: boolean = false; 
  categories = ['Electricista', 'Plomero', 'Peluquero'];

  @Input()  filteredCategories: string[] = [];// Recibe la lista de categorías filtradas
  @Output() search = new EventEmitter<string>(); 
  @Output() reset = new EventEmitter<void>(); // Emite el evento de reset hacia el componente padre
  

  constructor() { 
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredCategories = this.categories.filter(category =>
        category.toLowerCase().includes(value?.toLowerCase() || '')
      );
    });
  }

  onSearch() {
    const query = this.searchControl.value;
    this.search.emit(query!); // Emitir el término de búsqueda 
  }

  onReset() {
    this.searchControl.setValue(''); // Limpia el campo de búsqueda
    this.reset.emit(); // Emite el evento de reset
  }

  onInputChange() {
    const searchValue = this.searchControl.value?.toLowerCase() || '';
    this.filteredCategories = this.categories.filter(category =>
      category.toLowerCase().includes(searchValue)
    );
  }
}
