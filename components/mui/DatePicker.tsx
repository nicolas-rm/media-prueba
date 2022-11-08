import React from 'react'
import PropTypes from 'prop-types'
import { /* FormHelperText, */ TextField } from '@mui/material'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MobileDateTimePicker, MobileDatePicker } from '@mui/x-date-pickers'

// eslint-disable-next-line no-unused-vars
const MuiDatePicker = ({ picker, name, label, placeholder, inputFormat, openTo, views, formProps, future, value }) => {
    const [date, setDate] = React.useState<any>(value || '')
    /* const error = Boolean(formProps.errors[name]) */
    return picker === 'Date' ? (
        <LocalizationProvider dateAdapter={ AdapterMoment }>
            <MobileDatePicker
                label={ label }
                /* inputFormat={ inputFormat } */
                openTo={ openTo }
                value={ date || '' }
                views={ views }
                onChange={ e => {
                    setDate(moment(e).format('YYYY-MM-DD'))
                    formProps.setFieldValue(name, new Date(e) )
                } }
                disableFuture={ future }
                renderInput={ params => (
                    <TextField
                        size="small"
                        fullWidth
                        { ...params }
                        focused={ false }
                        error={ false }
                        placeholder={ placeholder }
                        /* sx={{ borderColor: '#1673b6', borderRadius: 0, borderWidth: 1, borderStyle: 'solid', padding: 0 }} */
                    />
                ) }
            />
            {/* { error && <FormHelperText>{ 'Seleccione una opcion' }</FormHelperText> } */}
        </LocalizationProvider>
    ) : picker === 'DateTime' ? (
        <LocalizationProvider dateAdapter={ AdapterMoment }>
            <MobileDateTimePicker
                label={ label }
                /* inputFormat={ inputFormat } */
                openTo={ openTo }
                value={ date }
                views={ views }
                onChange={ e => {
                    setDate(moment(e).format('YYYY-MM-DD HH:mm:ss'))
                    formProps.setFieldValue(name, new Date(e) )
                } }
                onClose={ () => setDate('') }
                renderInput={ params => (
                    <TextField
                        size="small"
                        fullWidth
                        { ...params }
                        focused={ false }
                        error={ false }
                        placeholder={ placeholder }
                        /* sx={{ borderColor: '#1673b6', borderRadius: 0, borderWidth: 1, borderStyle: 'solid', padding: 0 }} */
                    />
                ) }
            />
            {/* { error && <FormHelperText>{ 'Seleccione una opcion' }</FormHelperText> } */}
        </LocalizationProvider>
    ): null

}

MuiDatePicker.defaultProps = {
    placeholder : '',
    label       : '',
    inputFormat : '',
    openTo      : '',
    views       : [],
    pickers     : 'Date' || 'DateTime'
}

MuiDatePicker.propTypes = {
    picker      : PropTypes.string.isRequired,
    name        : PropTypes.string.isRequired,
    label       : PropTypes.string.isRequired,
    placeholder     : PropTypes.string.isRequired,
    inputFormat : PropTypes.string,
    views       : PropTypes.string,
    openTo      : PropTypes.string,
    formProps   : PropTypes.object.isRequired,
    future      : PropTypes.bool,
    value       : PropTypes.string
}

export default MuiDatePicker