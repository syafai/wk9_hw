// External Imports
import React, { useState } from 'react'; 
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'; 
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
    Typography} from '@mui/material'; 

// Internal Imports
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { CarForm } from '../CarForm';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90},
    {
        field: 'make',
        headerName: 'Make',
        width: 150,
        editable: true
    },
    {
        field: 'model',
        headerName: 'Model',
        width: 150
    },
    {
        field: 'year',
        headerName: 'Year',
        width: 110,
        type: 'number'
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150
    }, 
    {
        field: 'price',
        headerName: 'Price',
        width: 110,
        type: 'number'
    },
    {
        field: 'max_speed',
        headerName: 'Max Speed',
        width: 150,
        type: 'number'
    },
    {
        field: 'horsepower',
        headerName: 'Horsepower',
        width: 150,
        type: 'number'
    },
    {
        field: 'weight',
        headerName: 'Weight',
        width: 150,
        type: 'number'
    },
    {
        field: 'cost_of_production',
        headerName: 'Cost of Production',
        width: 150,
        type: 'number'
    },
    {
        field: 'series',
        headerName: 'Series',
        width: 150
    },
    {
        field: 'random_joke',
        headerName: 'Random Joke',
        width: 150
    },
    
];



  export const DataTable = () => {
    const { carData, getData } = useGetData()
    const [ open, setOpen ] = useState(false)
    const [ gridData, setData ] = useState<GridRowSelectionModel>([])


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    const myAuth = localStorage.getItem('myAuth')

    if (myAuth === 'true'){
    return (
        <Box sx={{ height: 400, width: '100%'}}>
            <DataGrid
                rows={carData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(newSelectionModel) => setData(newSelectionModel)}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant='contained' color='warning' onClick={deleteData}>Delete</Button>
            {/* Dialog Popup for Updating a Car */}
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Update A Car</DialogTitle>
                <DialogContent>
                    <DialogContentText>Car id: {gridData[0]}</DialogContentText>
                    <CarForm id={`${gridData[0]}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
        )} else {
            return (
                <Box>
                    <Typography variant='h4'>Please Sign In to View your Cars!</Typography>
                </Box>
            )
        }
  }
