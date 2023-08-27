import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ColabManagerWeb';
  showEmployeeTable = false; // Variável para controlar a exibição da tabela
}
