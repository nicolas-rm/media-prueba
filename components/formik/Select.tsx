import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'

import MUISelect from '../mui/Select'

const componentPropTypes = PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.string
])

export const Select = props => {
    const {
        childComponent,
        childProps,
        dataProps,
        fieldProps
    }: any = props
    const Child = childComponent || MUISelect

    return (
        <Field
            type="select"
            { ...fieldProps }
        >
            { ({ field, form }) => (
                <Child
                    { ...field }
                    childProps={ childProps }
                    dataProps={ dataProps }
                    formProps={ form }
                    disabled={ fieldProps.disabled }
                    placeholder={ fieldProps.placeholder }
                    select={ fieldProps.select }
                    execute={ fieldProps.execute }
                    /* dependence={ fieldProps.dependence } */
                />
            ) }
        </Field>
    )
}

Select.propTypes = {
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

Select.defaultProps = {
    childComponent : null,
    childProps     : {},
    value          : null,
    children       : null,
    dataProps      : {} || []
}