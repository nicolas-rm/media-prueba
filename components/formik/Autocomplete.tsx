import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'

import MuiAutocomplete from '../mui/Autocomplete'

export const Autocomplete = (props:any) => {
    const {
        childProps,
        dataProps,
        fieldProps/* ,
        name */  
    }: any = props

    return (
        <Field
            { ...fieldProps }
        >
            { ({ field, form }: any) => (
                <MuiAutocomplete
                    { ...field }
                    childProps={ childProps }
                    dataProps={ dataProps }
                    formProps={ form }
                    disabled={ fieldProps.disabled }
                    placeholder={ fieldProps.placeholder }
                    label={ fieldProps.label }
                    name={ fieldProps.name }
                    legend={ fieldProps.legend }
                    execute={ fieldProps.execute }
                    select={ fieldProps.select }
                    object={ fieldProps.object }
                    dependency={ fieldProps.dependency }
                />
            ) }
        </Field>
    )
}

Autocomplete.propTypes = {
    fieldProps     : PropTypes.object.isRequired,
    childProps     : PropTypes.object,
    value          : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            view  : PropTypes.string,
            value : PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        })
    ]),
    /* name      : PropTypes.string.isRequired,
    legend    : PropTypes.string.isRequired, */
    dataProps: PropTypes.array.isRequired
}

Autocomplete.defaultProps = {
    childComponent : null,
    childProps     : {},
    value          : null,
    dataProps      : []
}