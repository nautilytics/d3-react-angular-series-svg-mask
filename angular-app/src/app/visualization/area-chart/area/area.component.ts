import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-area]',
  templateUrl: './area.component.html'
})
export class AreaComponent {
  @Input() d: string;
}
