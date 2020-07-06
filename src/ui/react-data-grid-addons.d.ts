declare module 'react-data-grid-addons' {
    import * as React from "react";

    export namespace Editors {
        export namespace DropDown {
            export interface OptionItem {
                id: string;
                value: string;
                title?: string;
                text?: string;
            }
            export type Option = OptionItem | string;
        }
        export class DropDownEditor extends React.Component<{options: DropDown.Option[]}, any> {
            constructor(props: any);
        }
    }

    export namespace Menu {
        
    }
}