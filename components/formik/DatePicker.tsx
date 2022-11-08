import React from 'react'
import PropTypes from 'prop-types'
import  { Field } from 'formik'
import MuiDatePicker from '../mui/DatePicker'

export const Picker = (props: any) => {
    const {
        childProps,
        fieldProps/* ,
        name */
    }: any = props

    return (
        <Field
            { ...fieldProps }
        >
            { ({ field, form }) => (
                <MuiDatePicker
                    { ...field }
                    childProps={ childProps }
                    formProps={ form }
                    placeholder={ fieldProps.placeholder }
                    label={ fieldProps.label }
                    name={ fieldProps.name }
                    inputFormat={ fieldProps.inputFormat }
                    picker={ fieldProps.picker }
                    openTo={ fieldProps.openTo }
                    views={ fieldProps.views }
                    value={ fieldProps.value }
                />
            ) }
        </Field>
    )
}

Picker.propTypes = {
    fieldProps : PropTypes.object.isRequired,
    childProps : PropTypes.object.isRequired,
    value      : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            view  : PropTypes.string,
            value : PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        })
    ])
}

Picker.defaultProps = {
    childComponent : null,
    childProps     : {},
    value          : null
}