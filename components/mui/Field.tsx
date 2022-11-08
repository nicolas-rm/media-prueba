/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import numeral from 'numeral'

import CleaveInput from '../formik/CleaveInput'

const componentPropTypes = PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.string
])

const Field = props => {
    const _handleKeyPress = e => {
        if (e.which === 13) {
            const { formProps } = props
            formProps.submitForm()
        }
    }

    const _handleChange = e => {
        const { formProps, name, childProps: { onChangeFieldValue } } = props
        if (onChangeFieldValue) {
            onChangeFieldValue(e)
        }
        formProps.setFieldValue(name, checkChange(e))
    }

    const checkChange = e => {
        let val = e.target.value
        const { childProps } = props
        if (childProps.formatProps) {
            if (e.target.rawValue !== '') {
                switch (childProps.formatType) {
                    case 'simple':
                        val = e.target.rawValue
                        break
                    case 'fancy':
                        val = e.target.value
                        break
                    case 'toUpperCase':
                        val = e.target.value.toUpperCase()
                        break
                    default:
                        val = parseFloat(e.target.rawValue)
                }
            } else {
                val = undefined
            }
        }
        return val
    }

    const {
        childProps: {
            formatProps,
            // formatType,
            InputProps,
            // onChangeFieldValue,
            label = '',
            disableOnpaste = false,
            disablOnDrop = false,
            disableOnCopy = false,
            ...restChildProps
        },
        formProps,
        name,
        onBlur,
        placeholder,
        type,
        value,
        children,
        multiline,
        rows,
        submitOnEnter,
        required,
        disabled
    } = props
    // const touched = formProps.touched[name]
    const error = formProps.errors[name]
    let fieldValue = formProps.values[name] || ''
    if (formatProps) {
        InputProps.inputComponent = CleaveInput
        InputProps.inputProps = {
            formatProps,
            ...InputProps.inputProps
        }
    }
    if (InputProps?.readOnly) {
        InputProps.inputProps = { onInput: _handleChange }
        fieldValue = value?.view || ''
    }

    const _onBlur = (e:any) => {
        const { formProps, name } = props
        let val = e.target.value
        onBlur(e)
        if (props.mask && props.mask === 'money') {
            if(val !== '' && val !== undefined && val !== null) {
                val = numeral(val).format('$0,0.00')
            }else {
                val = ''
            }
            formProps.setFieldValue(name, val)
        }
    }

    const _onFocus = (e:any) => {
        const { formProps, name } = props
        let val = e.target.value
        if (props.mask && props.mask === 'money') {
            if(val !== '' && val !== undefined && val !== null) {
                val = numeral(val).value()
            }else {
                val = ''
            }
            formProps.setFieldValue(name, val)
        }
    }

    return (
        <TextField
            variant="outlined"
            size="small"
            fullWidth
            disabled={ disabled || formProps.disabled || formProps.isSubmitting }
            error={ !!error }
            required={ required }
            helperText={ error }
            InputProps={ InputProps }
            label={ label === '' ? placeholder : label }
            name={ name }
            onBlur={ _onBlur }
            onFocus={ _onFocus }
            onChange={ _handleChange }
            onKeyPress={ submitOnEnter ? _handleKeyPress : null }
            placeholder={ placeholder }
            type={ type }
            value={ fieldValue }
            onPaste={ e => { if (disableOnpaste) { e.preventDefault() } } }
            onCopy={ e => { if (disableOnCopy) { e.preventDefault() } } }
            onDrop={ e => { if (disablOnDrop) { e.preventDefault() } } }
            { ...restChildProps }
            multiline={ multiline }
            rows={ rows }
        >
            {children}
        </TextField>
    )
}

Field.propTypes = {
    childProps  : PropTypes.object.isRequired,
    formProps   : PropTypes.object.isRequired,
    name        : PropTypes.string.isRequired,
    onBlur      : PropTypes.func.isRequired,
    onChange    : PropTypes.func.isRequired,
    placeholder : PropTypes.string,
    type        : PropTypes.string,
    label       : PropTypes.string,
    value       : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            view: PropTypes.string
        })
    ]),
    children      : componentPropTypes,
    rows          : PropTypes.number,
    multiline     : PropTypes.bool,
    submitOnEnter : PropTypes.bool,
    disabled      : PropTypes.bool,
    required      : PropTypes.bool,
    mask          : PropTypes.string
}

Field.defaultProps = {
    placeholder   : '',
    type          : 'text',
    value         : undefined,
    label         : '',
    children      : null,
    rows          : 1,
    multiline     : false,
    submitOnEnter : true,
    disabled      : false,
    required      : false,
    mask          : ''
}

export default Field
