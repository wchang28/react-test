import * as React from 'react';
import {ReactNode} from "react";
import {PropertyDef, PropertyCustomFormatter} from "../common/types";
import {FormatterProps, Formatters} from "react-data-grid-addons-extension";

type ReactProps<P = unknown> = Readonly<P> & Readonly<{ children?: ReactNode }>;

const {SimpleCellFormatter, CheckboxFormatter} = Formatters;

function findCustomFormatterByPropId(customFormatters: PropertyCustomFormatter[], propId: string) {
    if (customFormatters && customFormatters.length > 0 && propId) {
        for (const cf of customFormatters) {
            if (cf.propId === propId) {
                return cf.formatter;
            }
        }
    }
    return null;
}

interface Props extends FormatterProps<any, PropertyDef> {
    customFormatters?: PropertyCustomFormatter[];
}

export function PropertyBasedFormatter(props: ReactProps<Props>) {
    const {propId, propType} = props.row;
    let internalFormatter = findCustomFormatterByPropId(props.customFormatters, propId);
    const internalFormatterProps = {...props};
    if (internalFormatterProps.customFormatters) {
        delete internalFormatterProps.customFormatters;
    }
    if (internalFormatter === null) {
        if (propType === "boolean") {
            internalFormatter = <CheckboxFormatter {...internalFormatterProps}/>
        } else {
            internalFormatter = <SimpleCellFormatter {...internalFormatterProps}/>
        }
    }
    return internalFormatter;
}