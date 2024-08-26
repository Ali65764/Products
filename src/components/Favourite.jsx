import React, { useEffect } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import { FaEye, FaTrashAlt } from "react-icons/fa";
import NavBar from '../pages/NavBar';
import { useNavigate } from 'react-router-dom';
export default function Favourite() {
  const {
    state,
    dispatch
  } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    const savedFavorite = JSON.parse(localStorage.getItem("favourite") || "[]");
    dispatch({ type: "LOAD_FAVOURITE", payload: savedFavorite });
  }, [dispatch])
  return (
    <>
      <NavBar />
      <div className='bg-slate-900 h-fit'>
        {state.favourite.length === 0 && (
          <h2 className="text-rose-100 text-2xl md:text-3xl pt-24 pl-12">
            Your Favourite is Empty...
          </h2> 
        )}
        <div className=" pt-12 flex justify-center flex-wrap gap-16">
          {state.favourite && state.favourite.length > 0 ? (
            state.favourite.map((product, index) => (
              <div key={index} className="bg-purple-100 p-2 rounded-md">
                <p className='font-bold text-[18px]'>{product.title}</p>
                <img className='w-[290px] h-[290px]' src={product.images} alt={product.title} />
                <p className='text-gray-600 font-bold'>{product.description.slice(0, 30)}</p>
                <p className='text-cyan-600 font-bold mt-2'>${product.price}</p>
                <p className='text-gray-600 font-bold mt-2'>Brand: {product.brand}</p>
                <div className='flex justify-center mt-4 '>
                  <button className='text-blue-700  text-[40px]' onClick={() => navigate(`/GoDetailsPage/${product.id}`)}><FaEye /></button>
                  <button onClick={() => dispatch({ type: "REMOVE_FAVOURITE", payload: product })} className='text-red-600 pl-4  text-[32px]'><FaTrashAlt /></button>
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



