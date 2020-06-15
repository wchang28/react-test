import * as XLSX from "xlsx";

export default (file: File) => {
    return new Promise<any>((resolve: (value: any) => void, reject: (err: any) => void) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, {
                type: 'binary'
            });
            const ret: any = {};
            workbook.SheetNames.forEach((sheetName) => {
                const XL_row_object = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName]);
                const json_object = JSON.stringify(XL_row_object);
                ret[sheetName] = JSON.parse(json_object);
            });
            resolve(ret);
        };
        reader.onerror = function(ex) {
            reject(ex);
        };
        reader.readAsBinaryString(file);
    })
}