export function isEmpty(data: any, key: string, rowNum: number): boolean {
    if (data.length === 0) {
        console.log(`${data} with row no ${rowNum} is empty`);
        return false;
    }
    return true;
}

export function isAlphanumeric(data: any, key: string, rowNum: number): boolean {
    const newData = data.replaceAll(" ", "");
    const regex = /[0-9\W]/.test(newData);
    if (regex){
        console.log(`${data} with row no ${rowNum} cannot contain numbers or special characters`);
        return false;
    }
    return true
}

export function isInteger(data: any, key: string, rowNum: number): boolean {
    if (Number(data) !== parseInt(data)) {
        console.log(`${data} with row no ${rowNum} can only be integers.`);
        return false;
    }
    return true;
}

export function hasAlphabets(data: any, key: string, rowNum: number): boolean {
    const newData = data.replaceAll(" ", "");
    const regex = /^\d+$/.test(newData);
    if (regex) {
        console.log(`${data} with row no ${rowNum} cannot contain not integers value.`);
        return false;

    }
    return true;
}

export function maxLength(data: any, key: string, rowNum: number): boolean {
    const strLength = 10;
    if (data.toString().length > strLength) {
        console.log(`${data} with row no ${rowNum} cannot have more than ${strLength} characters`);
        return false;

    }
    return true;
}

export  function maxAge(data: any, key: string, rowNum: number): boolean {
    const age = Number(data) 
    if (age > 100) {
        console.log(`${data} with row no ${rowNum} cannot be more than ${age} years old.`);
        return false;
    }
    return true;
}

export function isGenderValid(data: any, key: string, rowNum: number): boolean {
    if (data !== "Male" && data !== "Female" && data !== "Others"){
        console.log(`${data} with row no ${rowNum} is not available in our database`);
        return false
    }
    return true
}
