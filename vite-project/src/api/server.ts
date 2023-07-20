let token = '0b3be8f416ac29c6a4ae352a2b80ffc134a4385ecf62067b5'
import { CarState } from "../redux/slices/rootSlice";



export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://canary-steep-cycle.glitch.me/api/cars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }

        return await response.json()
    },
    create: async(data: CarState) => { 
        const response = await fetch(`https://canary-steep-cycle.glitch.me/api/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create data on server'), response.status 
        }

        return await response.json()
    },
    update: async(id: string, data: CarState) => { 
        const response = await fetch(`https://canary-steep-cycle.glitch.me/api/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create data on server'), response.status 
        }

        return await response.json()
    },
    delete: async(id: string) => {
        const response = await fetch(`https://canary-steep-cycle.glitch.me/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to delete data'), response.status
        }

    }
}