import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-parent',
  standalone: false,

  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.captureView();
  }
  // captureView() {
  //   const viewContent = document.getElementsByClassName('capture-container');

  //   if (viewContent?.[0]) {
  //     html2canvas(viewContent[0] as HTMLElement).then((canvas) => {
  //       const dataURL = canvas.toDataURL('H');
  //       console.log('Captured Canvas:', dataURL);
  //       const a = document.createElement('a');
  //       a.href = dataURL;
  //       a.download = 'screenshot.png';
  //       a.click();
  //     });
  //   }
  //   console.log('Captured View:', viewContent[0]);
  //   // this.sendInputToServer(viewContent);
  //   return viewContent;
  // }

  sendInputToServer(htmlString: string) {
    this.http
      .post('http://localhost:3000/saveHtml', { text: htmlString })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
  captureView() {
    const appParentElement = document.querySelector('.capture-container');
    if (appParentElement) {
      const viewContent =
        this.getElementWithInlineStyles(appParentElement).outerHTML;
      const styles = this.getAllStyles();
      const fullHtml = `<html><head>${styles}</head><body>${viewContent}</body></html>`;
      console.log('Captured View:', fullHtml);
      this.sendInputToServer(fullHtml);
      return fullHtml;
    }
    return '';
  }

  getElementWithInlineStyles(element: Element): Element {
    // const clone = element.cloneNode(true) as HTMLElement;
    // this.copyInlineStyles(element, clone);
    // return clone;
    return element;
  }

  copyInlineStyles(source: Element, target: Element) {
    const sourceChildren = source.children;
    const targetChildren = target.children;

    for (let i = 0; i < sourceChildren.length; i++) {
      const sourceChild = sourceChildren[i] as HTMLElement;
      const targetChild = targetChildren[i] as HTMLElement;

      if (sourceChild.style.cssText) {
        targetChild.style.cssText = sourceChild.style.cssText;
      }

      this.copyInlineStyles(sourceChild, targetChild);
    }
  }

  getAllStyles(): string {
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('');
        } catch (e) {
          console.error('Error reading stylesheet:', e);
          return '';
        }
      })
      .join('');
    return `<style>${styles}</style>`;
  }

  collectClassNames(element: Element, classNames: Set<string>) {
    if (element.classList) {
      element.classList.forEach((className) => classNames.add(className));
    }
    Array.from(element.children).forEach((child) =>
      this.collectClassNames(child, classNames)
    );
  }
}
