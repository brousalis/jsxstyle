'use strict';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let styleElement;
let styleIndex = -1;

if (module.hot) {
  if (typeof module.hot.data === 'object') {
    styleElement = module.hot.data.styleElement;
    styleIndex = module.hot.data.styleIndex;
  }

  module.hot.addDisposeHandler(function(data) {
    data.styleElement = styleElement;
    data.styleIndex = styleIndex;
  });
}

if (canUseDOM && !styleElement) {
  styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode('/* jsxstyle */'));
  document.head.appendChild(styleElement);
}

function addStyleToHead(rule) {
  if (canUseDOM) {
    styleElement.sheet.insertRule(rule, ++styleIndex);
  }
}

module.exports = addStyleToHead;
