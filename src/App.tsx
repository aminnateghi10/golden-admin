import React, {useEffect, Suspense, lazy} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux'
import {store} from "./store";

//styles
import 'react-toastify/dist/ReactToastify.css';
import './style/codebase.css'
import './style/main.css'
import './style/rtl.css'
import EditCost from "./pages/edit-cost";
import Payment from "./pages/payments";
import EditPayment from "./pages/edit-payment";
import AddUser from "./pages/add-user";

//layouts
const UserPanelLayout = lazy(() => import('./components/Layout/userPanelLayout'));
const UserAuthLayout = lazy(() => import("./components/Layout/userAuthLayout"));

//pages
const Dashboard = lazy(() => import("./pages"));
const Login = lazy(() => import('./pages/auth/login'));
const Costs = lazy(() => import("./pages/costs"));
const Users = lazy(() => import("./pages/users"));
const ChangePassword = lazy(() => import("./pages/change-password"));
const CreateCosts = lazy(() => import("./pages/create-costs"));
const CreatePayments = lazy(() => import("./pages/create-payments"));

const App = () => {

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Suspense fallback={<h3>loading...</h3>}>
                        <Routes>
                            //user panel
                            <Route path='/' element={<UserPanelLayout/>}>
                                <Route path='/' element={<Dashboard/>}/>
                                <Route path='/costs' element={<Costs/>}/>
                                <Route path='/costs/:id' element={<EditCost/>}/>
                                <Route path='/create-costs' element={<CreateCosts/>}/>
                                <Route path='/users' element={<Users/>}/>
                                <Route path='/change-password' element={<ChangePassword/>}/>
                                <Route path='/create-payments' element={<CreatePayments/>}/>
                                <Route path='/payments' element={<Payment/>}/>
                                <Route path='/edit-payment' element={<EditPayment/>}/>
                                <Route path='/add-user' element={<AddUser/>}/>
                                <Route path='*' element={<>404</>}/>
                            </Route>
                            //auth
                            <Route path='auth/' element={<UserAuthLayout/>}>
                                <Route path='login' element={<Login/>}/>
                            </Route>
                            //not defind
                            <Route path='*' element={<>404</>}/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </div>
    );
}

export default App;
