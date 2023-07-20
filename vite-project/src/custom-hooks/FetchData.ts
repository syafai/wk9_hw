import React, { useState, useEffect } from 'react'; 
import { serverCalls } from '../api';
import { CarState } from '../redux/slices/rootSlice';
// import our Car Interface 


export const useGetData = () => {
    const [carData, setData] = useState<CarState[]>([]); 

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {carData, getData: handleDataFetch}

}