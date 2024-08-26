import React, { useEffect } from 'react'
import NavBar from '../pages/NavBar'
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { useGlobalContext } from '../contexts/GlobalContext'
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
export default function Basket() {
  const {
    state,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    dispatch({ type: "LOAD_BASKET", payload: savedBasket });
  }, [dispatch]);


  
  return (
    <>
      <NavBar />
      <div className=' text-white flex justify-center mt-3'>
      <button className='bg-red-600  py-2 px-4 rounded-md' onClick={()=>dispatch({type:"REMOVE_ALL_BASKET"})}>Remove All</button>
      </div>
      <div className='bg-slate-900 h-fit'>
        {state.basket.length === 0 && (
          <h2 className="text-rose-100 text-3xl pt-24 pl-12">
            Your Basket is Empty...
          </h2>
        )}
        <div className=" pt-5 flex justify-center flex-wrap gap-16">
          {state.basket && state.basket.length > 0 ? (
            state.basket.map((product, index) => (
              <div key={index} className="bg-purple-100 p-2 rounded-md">
                <p className='font-bold text-[18px]'>{product.title}</p>
                <img className='w-[290px] h-[290px]' src={product.images} alt={product.title} />
                <p className='text-gray-600 font-bold'>{product.description?.slice(0, 30)}</p>
                <p className='text-cyan-600 font-bold mt-2'>${product.price}</p>
                <p className='text-gray-600 font-bold mt-2'>Brand: {product.brand}</p>
                <p className='text-cyan-600 font-bold mt-2'>Total:  ${(product.price*product.count).toFixed(2)}</p>
                <div className='flex justify-center mt-2'>
                  <button className='text-[12px] font-bold  bg-red-700 text-white px-3 rounded' onClick={() => dispatch({ type: "DECREMENT", payload: { id: product.id } })}><FiMinus /></button>
                  <p className='text-3xl px-2 text-gray-600'>{product.count}</p>
                  <button className='bg-green-700 text-white px-3  rounded' onClick={() => dispatch({ type: "INCREMENT", payload: { id: product.id } })}><FaPlus /></button>
                </div>
                <div className='flex justify-center mt-4 '>
                  <button className='text-blue-700  text-[40px]' onClick={() => navigate(`/GoDetailsPage/${product.id}`)}><FaEye /></button>
                  <button onClick={() => dispatch({ type: "REMOVE_BASKET", payload: product })} className='text-red-600 pl-4  text-[32px]'><FaTrashAlt /></button>
                </div>
              </div>
            ))
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    </>
  )
}

