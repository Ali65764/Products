import React, { useEffect } from 'react';
import NavBar from '../pages/NavBar';
import { GetProducts } from '../api/Request';
import { useGlobalContext } from '../contexts/GlobalContext';
import { FaEye, FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalContext();

  const fetchProducts = async () => {
    try {
      const response = await GetProducts();
      dispatch({ type: "GET_DATA", payload: response.products });
    } catch (error) {
      console.error('products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const isInFavourite = (product) => {
    return state.favourite.some(fav => fav.id === product.id);
  };

  const isInBasket = (product) => {
    return state.basket.some(bas => bas.id === product.id);
  };

  const handleSortChange = (e) => {
    dispatch({ type: "SORT_DATA", payload: e.target.value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <>
      <NavBar />
      <div className='bg-slate-700 flex justify-center items-center p-5 flex-col  md:flex-row'>
        <div className='mb-3 md:mb-0'>
          <input
            className='py-1 px-4 rounded-md'
            type="text"
            placeholder='Search'
            onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
          />
        </div>
        <div className='px-0  md:px-4 mb-3  md:mb-0'>
          <select className='rounded py-1 px-4' name="sort" id="sort" onChange={handleSortChange}>
            <option value="title">Sort by Title</option>
            <option value="high">Low to High</option>
            <option value="low">High to Low</option>
          </select>
        </div>
        <div>
          <button className='bg-purple-200 py-1 px-5 rounded' onClick={handleReset}>Reset</button>
        </div>
      </div>



      <div className="bg-slate-900 pt-12 flex justify-center flex-wrap gap-16">
        {state.search ? (
          state.search.length > 0 ? (
            state.search.map((product, index) => (
              <div key={index} className="bg-purple-100 p-2 rounded-md">
                <p className='font-bold text-[18px]'>{product.title}</p>
                <img className='w-[290px] h-[290px]' src={product.images[0]} alt={product.title} />
                <p className='text-gray-600 font-bold'>{product.description.slice(0, 30)}</p>
                <p className='text-cyan-600 font-bold mt-2'>${product.price}</p>
                <p className='text-gray-600 font-bold mt-2'>Brand: {product.brand}</p>
                <div className='text-center'>
                  <button
                    className='mt-4 bg-slate-700 text-white rounded-md py-1 px-6 font-semibold'
                    onClick={() => dispatch({ type: "ADD_BASKET", payload: product })}
                  >
                    {isInBasket(product) ? <p>Added</p> : <p>Add to Cart</p>}
                  </button>
                </div>
                <div className='flex justify-center mt-4'>
                  <button className='text-blue-700 text-[47px]' onClick={() => navigate(`/GoDetailsPage/${product.id}`)}>
                    <FaEye />
                  </button>
                  <button onClick={() => dispatch({ type: "ADD_FAVOURITE", payload: product })} className='text-red-600 pl-4 text-[41px]'>
                    {isInFavourite(product) ? <FaHeart className="text-red-600" /> : <FaRegHeart className="text-red-600" />}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-white text-3xl md:text-5xl'>Not Found</p>
          )
        ) : (
          state.data.map((product, index) => (
            <div key={index} className="bg-purple-100 p-2 rounded-md">
              <p className='font-bold text-[18px]'>{product.title}</p>
              <img className='w-[290px] h-[290px]' src={product.images[0]} alt={product.title} />
              <p className='text-gray-600 font-bold'>{product.description.slice(0, 30)}</p>
              <p className='text-cyan-600 font-bold mt-2'>${product.price}</p>
              <p className='text-gray-600 font-bold mt-2'>Brand: {product.brand}</p>
              <div className='text-center'>
                <button
                  className='mt-4 bg-slate-700 text-white rounded-md py-1 px-6 font-semibold'
                  onClick={() => dispatch({ type: "ADD_BASKET", payload: product })}
                >
                  {isInBasket(product) ? <p>Added</p> : <p>Add to Cart</p>}
                </button>
              </div>
              <div className='flex justify-center mt-4'>
                <button className='text-blue-700 text-[47px]' onClick={() => navigate(`/GoDetailsPage/${product.id}`)}>
                  <FaEye />
                </button>
                <button onClick={() => dispatch({ type: "ADD_FAVOURITE", payload: product })} className='text-red-600 pl-4 text-[41px]'>
                  {isInFavourite(product) ? <FaHeart className="text-red-600" /> : <FaRegHeart className="text-red-600" />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>


    </>
  );
}

export default Home;
