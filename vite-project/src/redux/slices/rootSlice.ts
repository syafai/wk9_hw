import { createSlice } from '@reduxjs/toolkit'; 


export interface CarState {
    make: string;
    model: string;
    year: number;
    price: number;
    description: string;
    max_speed: number;
    horsepower: number;
    weight: number;
    cost_of_production: number;
    series: string 
}

const initialState: CarState = {
    make: '',
    model: '',
    year: 0,
    price: 0,
    description: '',
    max_speed: 0,
    horsepower: 0,
    weight: 0,
    cost_of_production: 0,
    series: ''
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseDescription: (state, action ) => {state.description = action.payload }, 
        choosePrice: (state, action) => { state.price = action.payload }, 
        chooseSpeed: (state, action) => { state.max_speed = action.payload },
        chooseHorsepower: (state, action) => { state.horsepower = action.payload },
        chooseWeight: (state, action) => { state.weight = action.payload },
        chooseProdCost: (state, action) => { state.cost_of_production = action.payload },
        chooseSeries: (state, action) => { state.series = action.payload }
    }
})

// Export our Reducers 
export const reducer = rootSlice.reducer 
console.log(rootSlice)
export const {
    chooseMake,
    chooseModel,
    chooseYear,
    chooseDescription,
    choosePrice,
    chooseSpeed,
    chooseHorsepower,
    chooseWeight,
    chooseProdCost,
    chooseSeries
} = rootSlice.actions 
