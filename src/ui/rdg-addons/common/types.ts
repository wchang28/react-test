export type PropertyType = "string" | "number" | "boolean" | "date" | "option";

export interface PropertyDef {
    propId: string;
    propType: PropertyType;
    propName?: string;
    propReadOnly?: boolean;
}

export interface PropertyCustomEditor {
    propId: string;
    editor: JSX.Element;
}

export interface PropertyCustomFormatter {
    propId: string;
    formatter: JSX.Element;
}