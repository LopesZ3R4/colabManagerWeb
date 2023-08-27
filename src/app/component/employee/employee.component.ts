import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import { EmployeeService } from "../../service/employee.service";
import {interval, startWith, switchMap} from "rxjs";
import {EmployeeDialogComponent} from "../../employee-dialog/employee-dialog.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  employees: Employee[] = [];
  sortedEmployees: Employee[] = this.employees;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  ngOnInit(): void {
    this.getEmployeeList();

    // Chame o método do serviço para obter os clientes
    interval(30000) // 30 segundos
      .pipe(
        startWith(0), // Iniciar imediatamente
        switchMap(() => this.consultaEmployees.getEmployeeList())
      )
      .subscribe(
        (data: Employee[]) => {
          // Atribua os dados obtidos à propriedade clientes
          console.log('Atualizando dados da tabela...');
          this.employees = data;
          // Inicialmente, carrega todos os clientes sem filtro
          this.sortedEmployees = this.employees;
        },
        (error) => {
          // Trate os erros aqui, se necessário
          console.log(error);
        }
      );
  }
  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedEmployees = [...this.employees].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  dialogRef: MatDialogRef<EmployeeDialogComponent> | null = null;
  constructor(private consultaEmployees: EmployeeService, public dialog: MatDialog) {}
  private getEmployeeList() {
    this.consultaEmployees.getEmployeeList().subscribe(
      (data: Employee[]) => {
        // Atribua os dados obtidos à propriedade clientes
        this.employees = data;
        // Inicialmente, carrega todos os clientes sem filtro
        this.sortedEmployees = this.employees;
      },
      error => {
        // Trate os erros aqui, se necessário
        console.log(error);
      }
    );
  }

  addEmployee() {
    if (!this.dialogRef) { // Verifica se o diálogo não está aberto
      const dialogConfig = new MatDialogConfig(); // Crie uma nova configuração de diálogo

      dialogConfig.width = '400px';
      dialogConfig.position = {
        top: '50%', // Centraliza verticalmente
        left: '50%' // Centraliza horizontalmente
      };
      this.dialogRef = this.dialog.open(EmployeeDialogComponent, {
        width: '400px',
        data: {} // Você pode passar dados iniciais se necessário
      });

      this.dialogRef.afterClosed().subscribe((result: Employee) => {
        if (result) {
          // Aqui você pode adicionar a lógica para adicionar o novo funcionário
          // usando o serviço EmployeeService. Certifique-se de implementar isso.
          this.sortedEmployees.push(result);
        }
        this.dialogRef = null; // Marca o diálogo como fechado
      });
    }
  }

    editEmployee() {

  }

  deleteEmployee() {

  }
}
