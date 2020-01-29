import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  incrementCount = 5;

  private changeIncrementCount(row: number) {
    this.incrementCount = row;
  }
}
