export interface Validator {
    "Name": {
        validations: string[];
    };
    "Age": {
        validations: string[];
    };
    "Gender": {
        validations: string[];
    };
    "Number": {
        validations: string[];
    };
}
export interface TestData {
    "Name": string;
    "Number": number;
    "Gender": string;
    "Age": number;
    "__rowNum__": number;
}