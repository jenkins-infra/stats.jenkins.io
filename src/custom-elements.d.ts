declare global {
    declare namespace JSX {
        interface IntrinsicElements {
            // 'jio-navbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            // 'jio-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'jio-navbar': unknown;
            'jio-footer': unknown;
        }
    }
}
