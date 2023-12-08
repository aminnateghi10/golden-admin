import Cookies from "universal-cookie";

const cookies = new Cookies();
const loginToken= (token:string)=>{
    console.log(token)
    cookies.set('token' ,`Bearer ${token}`,{
        maxAge:60 * 60 * 24 * 10,
        path:'/'
    })
}

const logoutToken= ()=>{
    console.log('aaa343433')
    cookies.remove('token')
}

export {loginToken,logoutToken};