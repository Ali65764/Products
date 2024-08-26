import React, { useEffect } from 'react';
import NavBar from '../pages/NavBar';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import { GetSingleProducts } from '../api/Request';
import { Link } from 'react-router-dom';
import { ROUTER } from "../constant/Router"
function GoDetailsPage() {
  const { state, dispatch } = useGlobalContext();
  const { id } = useParams();

  const fetchSingleData = async () => {
    try {
      const getSingleData = await GetSingleProducts(id);
      dispatch({ type: "GET_SINGLE_DATA", payload: getSingleData });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSingleData();
  }, [id, dispatch]);

  if (!state.singleData) {
    return <p className='text-purple-100 text-2xl text-center'>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="max-w-lg bg-white mx-auto rounded-xl mt-5 md:mt-20 ">
        <img className='w-full h-64 object-cover object-center' src={state.singleData.images} alt={state.singleData.title} />
        <div className='px-4 py-2'>
        <p className='font-bold  text-2xl mt-4 '>{state.singleData.title}</p>
        <p className='text-gray-700 mt-4 '>{state.singleData.description}</p>
        <p className='text-gray-700  mt-1 '>${state.singleData.price}</p>
        <p className='text-gray-700  mt-1 '>Brand: {state.singleData.brand}</p>
        <Link to={ROUTER.Home} className='text-blue-700 mt-1'>Go Back</Link>
        </div>
      </div>
    </>
  );
}

export default GoDetailsPage;
