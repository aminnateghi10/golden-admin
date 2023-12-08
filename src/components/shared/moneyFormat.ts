export const moneyFormat = (number: number | string)=>{
    return Intl.NumberFormat().format(Math.floor(Math.abs(+number)))
}