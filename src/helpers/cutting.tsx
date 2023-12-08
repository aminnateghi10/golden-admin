
export const Cutting = (item:string , text:string) => {
    let indexOfItem = item.indexOf(text);
    return item.slice(indexOfItem)
}