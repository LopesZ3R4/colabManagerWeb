import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from "../component/employee/employee";
import { EmployeeService } from "../service/employee.service";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {
  selectedEmployeeId: number | null = null;
  employee: Employee = {
    id: 0,
    name: '',
    codfuncao: 0,
    salary: 0,
    dtnascimento: '00-00-0000',
    dtadmissao: '00-00-0000'
  };

  // Alterar para receber o funcionário como entrada
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee, // Receber o funcionário por meio do MAT_DIALOG_DATA
    private consultaEmployees: EmployeeService
  ) {
    this.employee = data; // Usar os dados do funcionário recebidos
    // Formatando as datas
    if(this.employee.dtnascimento && this.employee.dtadmissao ) {
      this.employee.dtnascimento = this.formatDateForDisplay(this.employee.dtnascimento);
      this.employee.dtadmissao = this.formatDateForDisplay(this.employee.dtadmissao);
    }
    console.log('ID Selecionado para Ação: '+this.employee.id);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {

    if (!this.employee.name || !this.employee.codfuncao || !this.employee.salary || !this.employee.dtnascimento || !this.employee.dtadmissao) {
      console.log('Preencha todos os campos obrigatórios');
      return;
    }

    this.employee.dtnascimento = this.formatDateForApi(this.employee.dtnascimento);
    this.employee.dtadmissao = this.formatDateForApi(this.employee.dtadmissao);

    if (this.employee.id) {
      // Se o ID existe, é uma edição
      this.consultaEmployees.updateEmployee(this.employee).subscribe(
        response => {
          console.log('Funcionário atualizado com sucesso', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Erro ao atualizar funcionário', error);
        }
      );
    } else {

      // Se o ID não existe, é uma inclusão
      this.consultaEmployees.postEmployee(this.employee).subscribe(
        response => {
          console.log('Funcionário cadastrado com sucesso', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Erro ao cadastrar funcionário', error);
        }
      );
    }
  }

  formatDateForApi(dateString: string): string {
    const year = dateString.substr(4, 8);
    const month = dateString.substr(2, 2);
    const day = dateString.substr(0, 2);
    return `${year}-${month}-${day}`;
  }
  formatDateForDisplay(dateString: string): string {
    const parts = dateString.split('-'); // Divide a data em partes
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}${month}${year}`;
  }
}
