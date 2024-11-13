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
  showSuggestions: boolean = false;// Estado para controlar visibilidad del desplegable
  categories = ['Abogado', 'Albañil', 'Carpintero/a','Centro de estetica','Contador/a','Costurero/a','Electricista','Gasista','Limpieza','Niñero/a','Paseador/a de perros','Peluquero/a','Pintor/a','Plomero/a','Psicologo/a','Tapicero/a','Techista','Uñas','Otro'];

  @Input()  filteredCategories: string[] = [];// Recibe la lista de categorías filtradas
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>(); // Emite el evento de reset hacia el componente padre

  constructor(private eRef: ElementRef)// `ElementRef` para detectar clics fuera del componente
  {/*
    // Filtrar categorías automáticamente al cambiar el valor en el campo de búsqueda
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredCategories = this.categories.filter(category =>
        category.toLowerCase().includes(value?.toLowerCase() || '')
      );
    });
    */
  }
   // Muestra las sugerencias al hacer clic en el campo de búsqueda
   showSuggestionsDropdown() {
    this.showSuggestions = true;
    this.onInputChange(); // Llama a onInputChange() para asegurarse de que filteredCategories esté actualizado
  }

  // Oculta las sugerencias
  hideSuggestionsDropdown() {
    this.showSuggestions = false;
  }

    // Método para buscar, emite el término ingresado
    // Ejecuta la búsqueda y oculta el desplegable
  onSearch() {
    const query = this.searchControl.value;
    this.search.emit(query!); // Emitir el término de búsqueda
    this.hideSuggestionsDropdown(); // Oculta el desplegable después de buscar
  }

  // Método para limpiar la búsqueda
  onReset() {
    this.searchControl.setValue(''); // Limpia el campo de búsqueda
    this.reset.emit(); // Emite el evento de reset
    this.hideSuggestionsDropdown(); // Oculta el desplegable al limpiar
  }

  // Método para actualizar las sugerencias basadas en el cambio de valor de entrada
  onInputChange() {
    const searchValue = this.searchControl.value?.toLowerCase() || '';
    this.filteredCategories = this.categories.filter(category =>
      category.toLowerCase().includes(searchValue)
    );
     // Si hay categorías filtradas, mostrar el desplegable
    this.showSuggestions = this.filteredCategories.length > 0;
  }


  // Detecta clics fuera del componente
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Oculta el desplegable si el clic es fuera del componente
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideSuggestionsDropdown();
    }
  }



}
