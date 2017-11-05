import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular calculator';
  operation: string[] = ['', '', ''];
  status: string = '';
  description: string = '';
  activeNumber: string = '';

  /*
  *
  *  Creating full numbers for operations
  *
  * */
  getNumbers(num: string): void {
    this.activeNumber += num;
    if (this.operation[1].length) {
      this.operation[2] = this.activeNumber;
    } else {
      this.operation[0] = this.activeNumber;
      this.description = '';
    }
    this.renderStatus();
  }

  /*
  *
  *  Render status
  *
  * */
  renderStatus(): void {
    this.status = this.operation.join(' ');
  }

  /*
  *
  *  Select operator : /,*,+,-
  *
  * */
  selectOperator(operator: string): void {
    if (!this.operation[0].length) {
      this.showError();
      this.description = 'Введите число';
      return;
    }
    this.operation[1] = operator;
    this.activeNumber = '';
    this.renderStatus();
  }

  /*
 *
 *  Display result operation and history
 *
 * */
  showResult(): void {
    if (this.confirmInputs()) {
      this.status = '' + this.Calculate();
      this.description = this.operation.join(' ');
      this.resetOperation();
    }
  }

  /*
  *
  *  Reset operation
  *
  * */
  resetOperation(): void {
    this.operation = ['', '', ''];
    this.activeNumber = '';
  }

  /*
  *
  *  Show text error
  *
  * */
  showError(): void {
    this.status = 'Ошибка!';
  }

  /*
  *
  *  Check errors
  *
  * */
  confirmInputs(): boolean {
    if (!this.operation[0].length) {
      this.showError();
      this.description = 'Введите первое число';
      return false;
    } else if (!this.operation[1].length) {
      this.showError();
      this.description = 'Выберите действие';
      return false;
    } else if (!this.operation[1].length) {
      this.showError();
      this.description = 'Введите второе число';
      return false;
    }
    return true;
  }

  /*
  *
  *  Calculate
  *
  * */
  Calculate(): number {
    switch (this.operation[1]) {
      case '*':
        return (parseFloat(this.operation[0]) * parseFloat(this.operation[2]));
      case '+':
        return parseFloat(this.operation[0]) + parseFloat(this.operation[2]);
      case '-':
        return parseFloat(this.operation[0]) - parseFloat(this.operation[2]);
      case '/':
        return parseFloat(this.operation[0]) / parseFloat(this.operation[2]);
    }
  }
}
