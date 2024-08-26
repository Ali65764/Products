import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ROUTER } from "../constant/Router"
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from '../contexts/GlobalContext';
import { FaBasketShopping } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi2";
function NavBar() {
    const {
        state,
        dispatch
    } = useGlobalContext()
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch({ type: "CALCULATE_TOTAL" })
        dispatch({ type: "CALCULATE_TOTAL_ITEMS" })
    }, [state.basket, dispatch])

    return (
        <>
            <div>
                <div className='flex justify-center items-center md:flex-row flex-col text-[43px] bg-black p-6 '>
                    <div className='flex justify-center items-center'>
                        <Link className={`${pathname === ROUTER.Home ? "text-white" : "text-gegagray"}`} to={ROUTER.Home} ><FaHome /></Link>
                        <Link className={`px-3 ${pathname === ROUTER.Favourite ? "text-white" : "text-gegagray"}`} to={ROUTER.Favourite}><FaHeart /></Link>
                    </div>
                    <Link className={` bg-slate-900 pr-3 p-1 rounded md:mt-0 mt-3 flex ${pathname === ROUTER.Basket ? "text-white" : "text-gegagray"}`} to={ROUTER.Basket}><FaBasketShopping />
                        <span className="bg-red-500 ml-2  text-white h-6 w-6 rounded-full px-3 py-1 flex items-center justify-center">
                            <span className="text-base ">{state.totalItems}</span>
                        </span>
                    </Link>
                    <div className='flex px-3 py-1 bg-slate-900 mx-4 rounded text-gegagray md:mt-0 mt-3'><HiCurrencyDollar />
                        <span className='flex justify-center items-center'>
                            <span className='text-white text-xl'>{state.totalPrice.toFixed(2)}</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}



export default NavBar