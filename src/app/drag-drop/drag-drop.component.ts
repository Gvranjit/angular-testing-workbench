import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragMove,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  standalone: false,
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss',
})
export class DragDropComponent {
  @ViewChild('groupsScroll', { static: false })
  groupsScroll!: ElementRef<HTMLElement>;
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

  // Groups: each group has an id, a name and an items array (the current list becomes the first group's items)
  groups: { id: string; name: string; items: string[] }[] = [
    { id: 'group-1', name: 'Default Group', items: this.meaningfulWords },
    { id: 'group-2', name: 'Extras', items: ['alpha', 'beta', 'gamma'] },
  ];

  // helper for template to connect all lists
  get allGroupIds() {
    return this.groups.map((g) => g.id);
  }
  drop(event: CdkDragDrop<string[]>) {
    // If dropped into the same container, just reorder
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move between containers
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // active selection: store the selected item value so selection works across groups
  activeItem: string | null = null;

  onSelect(item: string) {
    // toggle selection: selecting the already-active item will unselect it
    this.activeItem = this.activeItem === item ? null : item;
  }

  // Resizable container state
  containerWidth = 360; // initial width in px
  private resizing = false;
  private startX = 0;
  private startWidth = 0;
  readonly minWidth = 240;
  readonly maxWidth = 1200;

  // Auto-scroll state
  private autoScrollRaf: number | null = null;
  // normalized velocity between -1 (full up) and 1 (full down)
  private autoScrollVelocityNormalized = 0;
  private lastAutoScrollTime = 0; // timestamp from RAF in ms
  // configuration
  readonly autoScrollMargin = 48; // px from edge to start scrolling
  // maximum scroll speed in pixels per second (change this to control speed)
  // larger -> faster scrolling
  readonly maxAutoScrollSpeedPx = 800; // px / second

  constructor(private ngZone: NgZone) {}

  onDragStarted(_event: any) {
    // Move the auto-created CDK preview into the scroll container so it uses the same
    // coordinate system as the scroller. We run this on the next frame because
    // CDK creates the preview element after the dragstart event.
    requestAnimationFrame(() => {
      try {
        const preview = document.querySelector('.cdk-drag-preview') as HTMLElement | null;
        const container = this.groupsScroll?.nativeElement;
        if (preview && container && preview.parentElement !== container) {
          // preserve styles set by CDK
          const prevStyle = preview.getAttribute('style') ?? '';
          container.appendChild(preview);
          preview.setAttribute('style', prevStyle);
        }
      } catch (err) {
        // ignore — this is a best-effort reposition
      }
    });
  }

  onDragMoved(event: CdkDragMove) {
    const scrollEl = this.groupsScroll?.nativeElement;
    if (!scrollEl) return;

    const rect = scrollEl.getBoundingClientRect();
    const pointerY =
      event.pointerPosition?.y ?? (event.event as PointerEvent)?.clientY;
    if (!pointerY) return;

    const fromTop = pointerY - rect.top;
    const fromBottom = rect.bottom - pointerY;

    // compute normalized velocity in range [-1, 1]
    let normalized = 0;
    if (fromTop >= 0 && fromTop < this.autoScrollMargin) {
      normalized = -((this.autoScrollMargin - fromTop) / this.autoScrollMargin);
    } else if (fromBottom >= 0 && fromBottom < this.autoScrollMargin) {
      normalized = (this.autoScrollMargin - fromBottom) / this.autoScrollMargin;
    }

    // clamp to [-1, 1]
    if (normalized > 1) normalized = 1;
    if (normalized < -1) normalized = -1;

    this.autoScrollVelocityNormalized = normalized;
    if (normalized !== 0 && this.autoScrollRaf == null) {
      this.startAutoScroll();
    } else if (normalized === 0 && this.autoScrollRaf != null) {
      this.stopAutoScroll();
    }
  }

  onDragEnded() {
    this.stopAutoScroll();
  }

  private startAutoScroll() {
    if (this.autoScrollRaf != null) return;
    this.lastAutoScrollTime = 0;
    this.ngZone.runOutsideAngular(() => {
      const step = (timestamp: number) => {
        const el = this.groupsScroll?.nativeElement;
        if (!el) return;

        if (!this.lastAutoScrollTime) this.lastAutoScrollTime = timestamp;
        const dtSeconds = Math.min(0.05, (timestamp - this.lastAutoScrollTime) / 1000); // cap dt to 50ms
        this.lastAutoScrollTime = timestamp;

        if (this.autoScrollVelocityNormalized !== 0) {
          // scroll amount = normalized * maxSpeed(px/sec) * dt
          const delta = this.autoScrollVelocityNormalized * this.maxAutoScrollSpeedPx * dtSeconds;
          el.scrollTop += delta;
          this.autoScrollRaf = requestAnimationFrame(step);
        } else {
          this.stopAutoScroll();
        }
      };
      this.autoScrollRaf = requestAnimationFrame(step);
    });
  }

  private stopAutoScroll() {
    if (this.autoScrollRaf != null) {
      cancelAnimationFrame(this.autoScrollRaf);
      this.autoScrollRaf = null;
    }
    this.autoScrollVelocityNormalized = 0;
    this.lastAutoScrollTime = 0;
  }

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
