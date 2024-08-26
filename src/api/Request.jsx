import axios from "axios";

const Api = axios.create({
    baseURL: "https://dummyjson.com/products"
});

export const GetProducts = async () => {
    try {
        const response = await Api.get("/")
        if (response.status !== 200) {
            throw new Error("error")
        }
        else {
            return response.data
        }
    }
    catch (error) {
        console.log(error.message);
    }
};


export const GetSingleProducts = async(id)=>{
    try{
        const response = await Api.get(`/${id}`)
        if(response.status !== 200){
        throw new Error("error")
        }
        else{
            return response.data
        }
    }
    catch{
        console.log(error.message);
        
    }
}