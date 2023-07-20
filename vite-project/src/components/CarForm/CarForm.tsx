//External imports
import React from 'react'; 
import { useDispatch, useStore } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form'; 
import { Button } from '@mui/material'; 

//Internal imports 
import{
    chooseMake,
    chooseModel,
    chooseYear, 
    choosePrice,
    chooseDescription,
    chooseHorsepower,
    chooseSpeed,
    chooseProdCost,
    chooseWeight,
    chooseSeries } from '../../redux/slices/rootSlice'; 

import { CarState } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input'
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks/FetchData';

interface CarFormProps{
    id?: string;
    data?: CarState
}


export const CarForm = (props: CarFormProps) => {
    const dispatch = useDispatch();
   // const { carData, getData } = useGetData()
    const store = useStore()
    const { register, handleSubmit } = useForm<CarState>({})

    const onSubmit: SubmitHandler<CarState> = async(data, event) => {
        if (event) event?.preventDefault()

        if (props.id){
            console.log(props.id)
            await serverCalls.update(props.id, data)
            console.log(`Updated car: ${data.make}`)
            window.location.reload()
            if (event) event.currentTarget.reset()
        } else {
            dispatch(chooseMake(data.make))
            dispatch(chooseModel(data.model))
            dispatch(chooseYear(data.year))
            dispatch(chooseDescription(data.description))
            dispatch(choosePrice(data.price))
            dispatch(chooseSpeed(data.max_speed))
            dispatch(chooseProdCost(data.cost_of_production))
            dispatch(chooseHorsepower(data.horsepower))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseSeries(data.series))
            

            console.log(store.getState)

            await serverCalls.create(store.getState() as CarState)
            window.location.reload()
            if (event) event.currentTarget.reset()
        }
    }
    return (
        <div>
             <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='make'>Car Make</label>
                    <Input {...register('make')} name='make' placeholder='Make Here' />
                </div>
                <div>
                    <label htmlFor='model'>Car Model</label>
                    <Input {...register('model')} name='model' placeholder='Model Here' />
                </div>
                <div>
                    <label htmlFor='year'>Car Year</label>
                    <Input {...register('year')} name='year' placeholder='Year Here' />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <Input {...register('description')} name='description' placeholder='Description Here' />
                </div>
                <div>
                    <label htmlFor='price'>Price </label>
                    <Input {...register('price')} name='price' placeholder='Price Here' />
                </div>
                <div>
                    <label htmlFor='max_speed'>Max Speed</label>
                    <Input {...register('max_speed')} name='max_speed' placeholder='Max Speed' />
                </div>
                <div>
                    <label htmlFor='horsepower'>Horsepower</label>
                    <Input {...register('horsepower')} name='horsepower' placeholder='horsepower' />
                </div>
                <div>
                    <label htmlFor='weight'>Weight</label>
                    <Input {...register('weight')} name='weight' placeholder='Weight' />
                </div>
                <div>
                    <label htmlFor='cost_of_production'>Cost of Production</label>
                    <Input {...register('cost_of_production')} name='cost_of_production' placeholder='Cost of Production Here' />
                </div>
                <div>
                    <label htmlFor='series'>Series</label>
                    <Input {...register('series')} name='series' placeholder='Series Here' />
                </div>
                <Button type ='submit'>Submit</Button>
            </form>
        </div>
    )
}