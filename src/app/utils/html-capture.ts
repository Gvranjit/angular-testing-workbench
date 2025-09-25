export function captureView() {
  const appParentElement = document.getElementsByClassName('slide');
  if (appParentElement) {
    const viewContent = getElementWithInlineStyles(
      appParentElement[0]
    ).outerHTML;
    const styles = getAllStyles();
    const fullHtml = `<html><head>${styles}</head><body>${viewContent}</body></html>`;
    console.log('Captured View:', fullHtml);

    return fullHtml;
  }
  return '';
}

function getElementWithInlineStyles(element: Element): Element {
  const clone = element.cloneNode(true) as HTMLElement;
  copyInlineStyles(element, clone);
  return clone;
  // return element;
}

function copyInlineStyles(source: Element, target: Element) {
  const sourceChildren = source.children;
  const targetChildren = target.children;

  for (let i = 0; i < sourceChildren.length; i++) {
    const sourceChild = sourceChildren[i] as HTMLElement;
    const targetChild = targetChildren[i] as HTMLElement;

    if (sourceChild.style.cssText) {
      targetChild.style.cssText = sourceChild.style.cssText;
    }
    copyInlineStyles(sourceChild, targetChild);
  }
}

function getAllStyles(): string {
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

// function getAllStyles(): string {
//   const appParentElement = document.querySelector('.capture-container');
//   if (!appParentElement) return '';

//   const elements = Array.from(appParentElement.querySelectorAll('*'));
//   elements.push(appParentElement);

//   const styles = Array.from(document.styleSheets)
//     .map((styleSheet) => {
//       try {
//         return Array.from(styleSheet.cssRules)
//           .map((rule) => {
//             const cssRule = rule as CSSStyleRule;
//             if (elements.some((el) => el.matches(cssRule.selectorText))) {
//               return cssRule.cssText;
//             }
//             return '';
//           })
//           .join('');
//       } catch (e) {
//         console.error('Error reading stylesheet:', e);
//         return '';
//       }
//     })
//     .join('');
//   return `<style>${styles}</style>`;
// }
