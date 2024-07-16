import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {
  colors = [
    { name: 'Agua', code: '#00FFFF' },
    { name: 'Amarillo', code: '#FFED00' },
    { name: 'Azul', code: '#1717FF' },
    { name: 'Azul acero', code: '#6FA8DC' },
    { name: 'Azul claro', code: '#DCE4FF' },
    { name: 'Azul marino', code: '#0F5299' },
    { name: 'Azul oscuro', code: '#013267' },
    { name: 'Azul petróleo', code: '#1E6E7F' },
    { name: 'Beige', code: '#F5F3DC' },
    { name: 'Blanco', code: '#FFFFFF' },
    { name: 'Bordó', code: '#830500' },
    { name: 'Caqui', code: '#F0E68C' },
    { name: 'Celeste', code: '#83DDFF' },
    { name: 'Chocolate', code: '#9B3F14' },
    { name: 'Cian', code: '#00FFFF' },
    { name: 'Coral', code: '#FA8072' },
    { name: 'Coral claro', code: '#F9AC95' },
    { name: 'Crema', code: '#FFFEE0' },
    { name: 'Dorado', code: '#FFD700' },
    { name: 'Dorado oscuro', code: '#BF9000' },
    { name: 'Fucsia', code: '#FF00EC' },
    { name: 'Gris', code: '#E1E1E1' },
    { name: 'Gris oscuro', code: '#666666' },
    { name: 'Lavanda', code: '#D9D2E9' },
    { name: 'Lila', code: '#CC87FF' },
    { name: 'Marrón', code: '#A0522D' },
    { name: 'Marrón claro', code: '#AF8650' },
    { name: 'Marrón oscuro', code: '#5D3806' },
    { name: 'Naranja', code: '#FF8C00' },
    { name: 'Naranja claro', code: '#FDAF20' },
    { name: 'Naranja oscuro', code: '#D2691E' },
    { name: 'Negro', code: '#000000' },
    { name: 'Nude', code: '#FFE4C4' }
  ];
  selectedColor = { name: '', code: '' };
  isDropdownOpen = false;

  @Output() colorSelected = new EventEmitter<any>();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectColor(color) {
    this.selectedColor = color;
    this.colorSelected.emit(color);
    this.isDropdownOpen = false;
  }

}
