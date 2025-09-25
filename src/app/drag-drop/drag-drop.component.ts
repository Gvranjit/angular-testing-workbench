import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  standalone: false,
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss',
})
export class DragDropComponent {
  meaningfulWords: string[] = [
    'harmony',
    'velocity',
    'clarity',
    'resilience',
    'innovation',
    'serenity',
    'momentum',
    'integrity',
    'vision',
    'synergy',
    'courage',
    'compassion',
    'focus',
    'curiosity',
    'patience',
    'discipline',
    'creativity',
    'empathy',
    'gratitude',
    'balance',
    'clarity-of-purpose',
    'adaptability',
    'boldness',
    'confidence',
    'dedication',
    'efficiency',
    'flexibility',
    'generosity',
    'honesty',
    'imagination',
    'judgment',
    'kindness',
    'leadership',
    'mindfulness',
    'openness',
    'pragmatism',
    'quality',
    'respect',
    'sustainability',
    'trust',
  ];
  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray mutates the array to reflect the new order
    moveItemInArray(
      this.meaningfulWords,
      event.previousIndex,
      event.currentIndex
    );
  }

  // active selection index: only one item may be active at a time
  activeIndex: number | null = null;

  onSelect(index: number) {
    // toggle selection: selecting the already-active item will unselect it
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  // Resizable container state
  containerWidth = 360; // initial width in px
  private resizing = false;
  private startX = 0;
  private startWidth = 0;
  readonly minWidth = 240;
  readonly maxWidth = 1200;

  onResizeStart(event: MouseEvent | TouchEvent) {
    // prevent text selection
    event.preventDefault();
    this.resizing = true;
    const clientX = this.getClientX(event);
    this.startX = clientX;
    this.startWidth = this.containerWidth;

    // bind listeners on document to track pointer outside the handle
    document.addEventListener('mousemove', this.onResizing);
    document.addEventListener('mouseup', this.onResizeEnd);
    document.addEventListener('touchmove', this.onResizing, {
      passive: false,
    } as any);
    document.addEventListener('touchend', this.onResizeEnd);
  }

  onResizing = (event: MouseEvent | TouchEvent) => {
    if (!this.resizing) return;
    event.preventDefault();
    const clientX = this.getClientX(event);
    const dx = clientX - this.startX;
    let newWidth = this.startWidth + dx;
    if (newWidth < this.minWidth) newWidth = this.minWidth;
    if (newWidth > this.maxWidth) newWidth = this.maxWidth;
    this.containerWidth = Math.round(newWidth);
  };

  onResizeEnd = (_event?: MouseEvent | TouchEvent) => {
    if (!this.resizing) return;
    this.resizing = false;
    document.removeEventListener('mousemove', this.onResizing);
    document.removeEventListener('mouseup', this.onResizeEnd);
    document.removeEventListener('touchmove', this.onResizing as any);
    document.removeEventListener('touchend', this.onResizeEnd as any);
  };

  private getClientX(event: MouseEvent | TouchEvent) {
    if ((event as TouchEvent).touches && (event as TouchEvent).touches.length)
      return (event as TouchEvent).touches[0].clientX;
    if (
      (event as TouchEvent).changedTouches &&
      (event as TouchEvent).changedTouches.length
    )
      return (event as TouchEvent).changedTouches[0].clientX;
    return (event as MouseEvent).clientX;
  }
}
