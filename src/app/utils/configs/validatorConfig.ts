import { Validator } from '../interfaces'

export const validator: any = {
    "Name": {
        validations: ["isEmpty", "isAlphanumeric"]
    },
    "Age": {
        validations: ["isEmpty", "isInteger", "maxAge"]
    },
    "Number": {
        validations: ["isEmpty", "isInteger", "maxLength"]
    },
    "Gender": {
        validations: ["isEmpty", "isGenderValid"]
    }
}