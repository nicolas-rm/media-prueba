import React from 'react'
import PropTypes from 'prop-types'

import { Field as RealFormikField } from 'formik'
import MUIField from '../mui/Field'

const componentPropTypes = PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.string
])

export const Field = ({ fieldProps, childProps, childComponent, value, children }) => {
    const Child = childComponent || MUIField
    return (
        <RealFormikField
            { ...fieldProps }
        >
            { ({ field: { value: fieldValue, ...fieldRest }, form }) => {
                const val = value || fieldValue
                return (
                    <Child
                        { ...fieldRest }
                        childProps={ childProps }
                        formProps={ form }
                        placeholder={ fieldProps.placeholder }
                        type={ fieldProps.type }
                        value={ val }
                        multiline={ fieldProps.multiline }
                        rows={ fieldProps.rows }
                        submitOnEnter={ fieldProps.submitOnEnter }
                        disabled={ fieldProps.disabled }
                        required={ fieldProps.required }
                        mask={ fieldProps.mask }
                    >
                        {children}
                    </Child>
                )
            } }
        </RealFormikField>
    )
}

Field.propTypes = {
    fieldProps     : PropTypes.object.isRequired,
    childProps     : PropTypes.object,
    childComponent : componentPropTypes,
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
    children: componentPropTypes
}

Field.defaultProps = {
    childComponent : null,
    childProps     : {},
    value          : null,
    children       : null
}
