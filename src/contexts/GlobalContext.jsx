import { useContext, createContext } from "react";
import { useReducer, useEffect } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const initialValue = {
        data: [],
        favourite: [],
        search: "",
        basket: [],
        count: 1,
        price: null,
        totalPrice: 0,
        singleData: null,
        resetData: [],
        totalItems:0,   
    };
    

    const [state, dispatch] = useReducer(reducer, initialValue);

    function reducer(state, action) {
        switch (action.type) {
            case "GET_DATA":
                return { ...state, data: action.payload, resetData: action.payload }; 

            case "ADD_FAVOURITE":
                const isAlreadyFavourite = state.favourite.some(fav => fav.id === action.payload.id);
                if (isAlreadyFavourite) {
                    const updatedFavourite = state.favourite.filter(fav => fav.id !== action.payload.id);
                    localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
                    toast.info("Product removed from favourites", { autoClose: 1500 });
                    return { ...state, favourite: updatedFavourite };
                } else {
                    const newFavourite = [...state.favourite, { ...action.payload, count: 1 }];
                    localStorage.setItem("favourite", JSON.stringify(newFavourite));
                    toast.success("Product added to favourites", { autoClose: 1500 });
                    return { ...state, favourite: newFavourite };
                }

            case "REMOVE_FAVOURITE":
                const updatedFavourite = state.favourite.filter(fav => fav.id !== action.payload.id);
                localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
                toast.success("Product deleted successfully!", { autoClose: 1500 });
                return { ...state, favourite: updatedFavourite };

            case "LOAD_FAVOURITES_FROM_STORAGE":
                return { ...state, favourite: action.payload || [] };

            case "LOAD_FAVOURITE":
                return { ...state, favourite: action.payload };

            case "SEARCH":
                const searchData = state.data.filter(product =>
                    product.title.toLowerCase().includes(action.payload.toLowerCase())
                );
                return { ...state, search: searchData};

            case "ADD_BASKET":
                const isAlreadyBasket = state.basket.some(bas => bas.id === action.payload.id);
                if (isAlreadyBasket) {
                    toast.error("This product is already in your cart", { autoClose: 1500 });
                    return state;
                } else {
                    const newBasket = [...state.basket, { ...action.payload, count: 1 }];
                    localStorage.setItem("basket", JSON.stringify(newBasket));
                    toast.success("Product added successfully!", { autoClose: 1500 });
                    return { ...state, basket: newBasket };
                }

            case "LOAD_BASKET":
                return { ...state, basket: action.payload };

            case "LOAD_BASKETS_FROM_STORAGE":
                return { ...state, basket: action.payload || [] };

            case "REMOVE_BASKET":
                const updatedBasket = state.basket.filter(bas => bas.id !== action.payload.id);
                localStorage.setItem("basket", JSON.stringify(updatedBasket));
                toast.success("Product deleted successfully!", { autoClose: 1500 });
                return { ...state, basket: updatedBasket };


            case "REMOVE_ALL_BASKET":
                localStorage.removeItem("basket");
                return{...state,basket:[]}


            case "INCREMENT":
                const incrementedBasket = state.basket.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, count: item.count + 1 };
                    }
                    return item;
                });
                localStorage.setItem("basket", JSON.stringify(incrementedBasket));
                return { ...state, basket: incrementedBasket };

            case "DECREMENT":
                const decrementedBasket = state.basket.map(item => {
                    if (item.id === action.payload.id) {
                        const newCount = item.count - 1;
                        return { ...item, count: newCount > 1 ? newCount : 1 };
                    }
                    return item;
                });
                localStorage.setItem("basket", JSON.stringify(decrementedBasket));
                return { ...state, basket: decrementedBasket };

            case "CALCULATE_TOTAL":
                const totalPrice = state.basket.reduce((total, item) => total + item.price * item.count, 0);
                return { ...state, totalPrice: totalPrice };


            case "CALCULATE_TOTAL_ITEMS":
                const totalItems = state.basket.reduce((total,item)=>total+item.count,0)
                return{...state,totalItems:totalItems}


            case "GET_SINGLE_DATA":
                return { ...state, singleData: action.payload };

            case "SORT_DATA":
                let sortedData = [...state.data];
                switch (action.payload) {
                    case "title":
                        sortedData.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    case "high":
                        sortedData.sort((a, b) => a.price - b.price);
                        break;
                    case "low":
                        sortedData.sort((a, b) => b.price - a.price);
                        break;
                    default:
                        break;
                }
                return { ...state, data: sortedData };

            case "RESET":
                return { ...state, data: state.resetData }; 

            default:
                return state;
        }
    }

    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem("favourite")) || [];
        dispatch({ type: "LOAD_FAVOURITES_FROM_STORAGE", payload: savedFavourites });
    }, [dispatch]);

    useEffect(() => {
        const savedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
        const filteredBasket = savedBasket.filter(item => item !== null);
        dispatch({ type: "LOAD_BASKET", payload: filteredBasket });
    }, [dispatch]);

    const contextValue = { state, dispatch };

    return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { useGlobalContext, GlobalContextProvider };
