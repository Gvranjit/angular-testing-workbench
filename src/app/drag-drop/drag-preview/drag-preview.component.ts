import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-preview.component.html',
  styleUrls: ['./drag-preview.component.scss'],
})
export class DragPreviewComponent {
  @Input() text = '';
}
