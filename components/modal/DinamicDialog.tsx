import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Box, Dialog, DialogTitle, DialogActions, Button, DialogContent, CircularProgress, Toolbar, Card, CardContent, Grid } from '@mui/material'
import { MultiModal } from '../../components/interfaces/interface'
import { Select, Autocomplete, Picker, Field } from '../formik/index'
/* import Select from '../formik/Select' 
import Autocomplete from '../formik/Autocomplete'
import Picker from '../formik/DatePicker' */

// eslint-disable-next-line no-unused-vars
export const DinamicDialog = ({ fields, dialog, refetch, reset, confirmation, title, initial, loading, validationSchema }) => {
    const list: Array<MultiModal> = fields

    // * Saber cuantos field iran 
    const divider = (list.length % 2) === 0 ? list.length / 2 : (list.length - 1) / 2

    const select = (value: MultiModal) => {
        return (
            <Select
                dataProps={{
                    data: value.select
                }}
                childProps={{
                    labelProps: {
                        label: value.description
                    }
                }}
                fieldProps={{
                    name       : value.name,
                    execute    : value.execute,
                    disabled   : value.disabled
                }}
            />
        )
    }

    const field = (value: MultiModal) => {
        return (
            <Field
                fieldProps={{
                    name        : value.name,
                    type        : value.type,
                    placeholder : value.description,
                    required    : value.required,
                    mask        : value.mask
                }}
            />
        )
    }

    const autocomplete = (value: MultiModal) => {
        /* const val = [{ id: 1, label: 'uno', name: 'uno'},{ id: 2, label: 'dos', name: 'dos'},{ id: 3, label: 'tres', name: 'tres'}] */
        return (
            <Autocomplete
                dataProps={
                    value.options
                }
                fieldProps={{
                    name        : value.name,
                    placeholder : value.description,
                    label       : value.description,
                    legend      : 'Elije una opcion',
                    dependency  : value.dependency,
                    select      : value.selection
                }}
            />
        )
    }

    const picker = (value: MultiModal) => {
        return (
            <Picker
                fieldProps={{
                    name        : value.name,
                    placeholder : value.description,
                    label       : value.description,
                    picker      : value.type,
                    inputFormat : value.picker?.inputFormat,
                    legend      : value.picker?.legend,
                    openTo      : value.picker?.openTo,
                    views       : value.picker?.views
                    /* inputFormat : 'DDDD/MMMM/YYYY',
                    legend      : 'Elije una opcion',
                    openTo      : 'day',
                    views       : ['day'] */
                }}
            />
        )
    }

    return (
        <Dialog open={ dialog?.show } onClose={ () => reset() } fullWidth maxWidth="sm">

            <Box sx={{ position: 'relative', backgroundColor: '#1673b6' }}>
                <Toolbar>
                    <DialogTitle id="alert-dialog-title" sx={{ flex: 1, color: 'white' }}>
                        { title }
                    </DialogTitle>
                </Toolbar>
            </Box>
            <Formik
                onSubmit={ confirmation }
                initialValues={ initial }
                validationSchema={ validationSchema }
                validateOnBlur validateOnChange
            >
                {({ handleSubmit, values, errors }) => {
                    console.log('\n')
                    console.log('Values on Dinamic Field')
                    console.log(values)
                    console.log('Errors on Dinamic Field')
                    console.log(errors)
                    console.log('\n')
                    return (
                        <>
                            <DialogContent>
                                <Card variant="elevation" elevation={ 0 }>
                                    <CardContent>
                                        <Grid container>
                                            {/* Container */}
                                            <Grid item xs={ 12 } sm={ 12 }>
                                                {/* Box */}
                                                <Box display="flex" flexDirection="row" flexWrap="wrap">
                                                    {/* Row Column */}
                                                    {
                                                        list.map((campo, index) => {
                                                            if(divider != null) {
                                                                if(index < divider) {
                                                                    /* rowColumnCont ++ */
                                                                    return (
                                                                        <>
                                                                            <Box flex={ 1 } my={ 1.5 } mx={ 1 } sx={{ minWidth: '100px' }}>
                                                                                {
                                                                                    campo.type === 'select' ? select(campo) : campo.type === 'string' || campo.type === 'number' ? field(campo) : campo.type === 'switch' ? field(campo) : campo.type === 'autocomplete' ? autocomplete(campo) : campo.type === 'Date' || campo.type === 'DateTime' ? picker(campo) : null
                                                                                }
                                                                            </Box>
                                                                        </>
                                                                    )
                                                                }
                                                            }
                                                        })
                                                    }
                                                </Box>
                                                {
                                                    Number(divider) >= 2 && (
                                                        /* Box */
                                                        <Box display="flex" flexDirection="row" flexWrap="wrap">
                                                            {/* Row Column */}
                                                            {
                                                                list.slice(Number(divider)).map((campo, index) => {
                                                                    if(divider != null) {
                                                                        if(index < divider) {
                                                                            /* rowColumnCont ++ */
                                                                            return (
                                                                                <>
                                                                                    <Box flex={ 1 } my={ 1.5 } mx={ 1 } sx={{ minWidth: '100px' }}>
                                                                                        {
                                                                                            campo.type === 'select' ? select(campo) : campo.type === 'string' || campo.type === 'number' ? field(campo) : campo.type === 'switch' ? field(campo) : campo.type === 'autocomplete' ? autocomplete(campo) : campo.type === 'Date' || campo.type === 'DateTime' ? picker(campo) : null
                                                                                        }
                                                                                    </Box>
                                                                                </>
                                                                            )
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </Box>
                                                    )
                                                }
                                                {
                                                    (list.length % 2) !== 0 && (
                                                        <Box display="flex" flexDirection="row" flexWrap="wrap">
                                                            {
                                                                list.map((campo, index)=> {
                                                                    if(index === list.length - 1){
                                                                        return (
                                                                            <>
                                                                                <Box flex={ 1 } my={ 1.5 } mx={ 1 } sx={{ minWidth: '100px' }}>
                                                                                    {
                                                                                        campo.type === 'select' ? select(campo) : campo.type === 'string' || campo.type === 'number' ? field(campo) : campo.type === 'switch' ? field(campo) : campo.type === 'autocomplete' ? autocomplete(campo) : campo.type === 'Date' || campo.type === 'DateTime' ? picker(campo) : null
                                                                                    }
                                                                                </Box>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Box>
                                                    ) 
                                                }
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </DialogContent>
                            <DialogActions>
                                {
                                    loading ? <CircularProgress /> : (
                                        <>
                                            <Button variant="outlined" color="error" onClick={ () => reset() }>
                                                Cancelar
                                            </Button>
                                            <Button variant="contained" onClick={ () => handleSubmit() }>
                                                Continuar
                                            </Button>
                                        </>
                                    )
                                }
                            </DialogActions>
                        </>
                    )
                } }
            </Formik>
        </Dialog>
    )
}

DinamicDialog.propTypes = {
    fields            : PropTypes.array.isRequired,
    dialog            : PropTypes.object.isRequired,
    refetch           : PropTypes.func,
    reset             : PropTypes.func.isRequired,
    confirmation      : PropTypes.func.isRequired,
    title             : PropTypes.string.isRequired,
    validationSchema : PropTypes.any
}

DinamicDialog.defaultProps = {
    initial: {
        default: null
    },
    loading : false,
    refetch : () => {}
}

export default DinamicDialog