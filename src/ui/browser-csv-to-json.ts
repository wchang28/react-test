import {default as csv} from "csvtojson";

export default (file: File, output?: "json" | "csv" | "line", noheader?: boolean) => {
    return new Promise<any[]>((resolve: (value: any[]) => void, reject: (err: any) => void) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result as string;
            csv({output, noheader})
            .fromString(data)
            .then(resolve);
        };
        reader.onerror = function(ex) {
            reject(ex);
        };
        reader.readAsText(file);
    })
}