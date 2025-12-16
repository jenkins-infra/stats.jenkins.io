// declare global {
//     declare namespace JSX {
//         interface IntrinsicElements {
//             'jio-navbar': any;
//             'jio-footer': any;
//         }
//     }
// }
// Make this a module so TS recognizes it
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'jio-navbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'jio-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

