// src/app/components/employee-dialog/employee-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from "../component/employee/employee";
import {EmployeeService} from "../service/employee.service";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {

  newEmployee: Employee = {
    id:0,
    name: '',
    codfuncao: 0,
    salary: 0,
    dtnascimento: '',
    dtadmissao: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,private consultaEmployees: EmployeeService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    if (!this.newEmployee.name || !this.newEmployee.codfuncao || !this.newEmployee.salary || !this.newEmployee.dtnascimento || !this.newEmployee.dtadmissao) {
      console.log('Preencha todos os campos obrigatórios');
      return; // Para a execução do método caso algum campo esteja vazio
    }
    // Formatação das strings de data conforme necessário
    // Certifique-se de implementar a lógica de formatação adequada
    this.newEmployee.dtnascimento = this.formatDateForApi(this.newEmployee.dtnascimento);
    this.newEmployee.dtadmissao = this.formatDateForApi(this.newEmployee.dtadmissao);

    console.log(this.newEmployee.dtnascimento);
    this.consultaEmployees.postEmployee(this.newEmployee).subscribe(
      response => {
        // Aqui você pode lidar com a resposta da API
        console.log('Funcionário cadastrado com sucesso', response);
        this.dialogRef.close();
      },
      error => {
        // Aqui você pode lidar com erros
        console.error('Erro ao cadastrar funcionário', error);
      }
    );
  }

  formatDateForApi(dateString: string): string {
    const day = dateString.substr(0, 2);
    const month = dateString.substr(2, 2);
    const year = dateString.substr(4, 4);
    const utcDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return utcDate.toISOString(); // Retorna a data formatada no formato UTC
  }

}
