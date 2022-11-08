import React from 'react'
// eslint-disable-next-line no-unused-vars
import { FormControl, Autocomplete, TextField, FormHelperText, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'

//* { name: (origen)  , dependency: (variable que depende) }
// eslint-disable-next-line no-unused-vars
const MuiAutocomplete = ({ name, dataProps, placeholder, label, legend, formProps, execute, select, object, dependency }) => {
    
    const handleValue = () => {
        if(dependency) {
            if(!formProps.values[dependency?.name]) {
                return { id: '', label: '', name: ''  }
            }

            if(formProps.values[dependency?.name]){
                return dataProps?.filter(option =>  formProps.values[dependency?.name] === option.id)[0]
            }

        }

        if(!dependency){
            if(formProps.values[name]){
                return dataProps?.filter(option =>  formProps.values[name] === option.id)[0]
            }

            if(formProps.values[name]){
                return { id: '', label: '', name: ''  }
            }
        }
    }

    const handleOptions = (): Array<any> => {
        if(dependency) {
            if(formProps.values[dependency?.name]){
                return dataProps?.filter(option =>  formProps.values[dependency?.name] === option.name )
            }

            if(!formProps.values[dependency?.name]){
                return []
            }
        }

        if(!dependency){
            return dataProps
        }
        return []
    }

    const [autocompleteVal, setAutocompleteVal] = React.useState<any>(formProps.values[dependency?.name] || !formProps.values[dependency?.name] ? handleValue() : select.length > 0 ? select[0] : select ? select : { id: '', label: '', name: '' })
    const [inputAutocompleteVal, setInputAutocompleteVal] = React.useState<any>(null)
    const error = Boolean(formProps.errors[name])

    /* React.useEffect(() => {
        async function loadStuff () {
            handleValue()
            handleOptions()
            setState(true)
        }
        if (!state) loadStuff
    }, [handleOptions, handleValue, state]) */
    
    return (
        <FormControl error={ error } variant="outlined" sx={{ minWidth: '100%' }}>
            <Autocomplete
                value={ autocompleteVal }
                isOptionEqualToValue={ option => option?.id === handleValue()?.id || option?.id === autocompleteVal?.id }
                onChange={ (event, newValue:any) => {
                    setAutocompleteVal(newValue)
                    formProps.setFieldValue(name, object === true ? newValue : newValue.id)
                    execute({...newValue, name})
                } }
                inputValue={ inputAutocompleteVal }
                onInputChange={ (event, newInputValue) => setInputAutocompleteVal(newInputValue) }
                disablePortal={ false }
                disableClearable
                id={ name }
                options={ handleOptions() }
                autoComplete={ false }
                sx={{ width: 'auto' }}
                placeholder={ placeholder }
                renderInput={ params => <TextField { ...params } error={ error } size="small" autoComplete="new-password" label={ label } InputLabelProps={{ shrink: inputAutocompleteVal !== '' ? true: false }} /> }
            />
            {/* <MenuItem value=""><em>Limpiar</em></MenuItem> */}
            { error && <FormHelperText>{ 'Seleccione una opcion' }</FormHelperText> }
        </FormControl>
    )
}

MuiAutocomplete.defaultProps = {
    placeholder : '',
    label       : '',
    // eslint-disable-next-line no-unused-vars
    execute     : (obj: any) => {},
    select      : [],
    object      : false
}

MuiAutocomplete.propTypes = {
    name        : PropTypes.string.isRequired,
    dataProps   : PropTypes.array.isRequired,
    placeholder : PropTypes.string,
    label       : PropTypes.string,
    legend      : PropTypes.string,
    formProps   : PropTypes.object.isRequired,
    execute     : PropTypes.func,
    select      : PropTypes.array,
    object      : PropTypes.bool,
    dependency  : PropTypes.object
}

export default MuiAutocomplete