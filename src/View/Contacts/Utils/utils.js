export const  capitalizeWords = (input)=> {
return input.replace(/\b\w/g, (match) => match.toUpperCase());
}