import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FormControl, FormHelperText, Select as RealMUISelect, MenuItem, InputLabel } from '@mui/material/'

import shortId from '../../lib/shortId'

const transformDataPropType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
])

const getFromTransformData = ({ value, transformData, field }) => _.get(value, transformData?.[field] || field, null)
const Select = props => {

    const {
        childProps: {
            className,
            MenuProps,
            SelectDisplayProps,
            controlProps,
            labelProps: {
                label,
                ...restLabelProps
            },
            ...rest
        },
        dataProps: {
            data,
            loading,
            transformData
        },
        formProps: {
            errors,
            isSubmitting
            // touched
        },
        name,
        onBlur,
        disabled,
        value
        // select
    } = props

    const _handleChangeSelect = (e: { target: { name: any; value: any } }) => {
        const { dataProps, onChange } = props
        onChange(e)
        if (dataProps.getValue) {
            const { target: { name, value } } = e
            dataProps.getValue({ name, value })
        }
    }

    const renderValue = (value: string) => {
        /* console.log('\n')
        console.log(value) */
        const {
            dataProps: {
                data,
                loading,
                transformData
            } = { data: null, loading: false, transformData: null },
            placeholder
        } = props
        if (value !== '' && !loading && !_.isEmpty(data)) {

            const item = data.find((val: any) => getFromTransformData({ value: val, transformData, field: 'id' }) === value) || {}
            /* execute ? execute(item) : null */
            /* let label */
            /* execute ? label = getFromTransformData({ value: item, transformData, field: 'label' }) : null */
            const name = getFromTransformData({ value: item, transformData, field: 'name' }),
                moreData = getFromTransformData({ value: item, transformData, field: 'moreData' }),
                /* stringName = moreData !== null && moreData !== '' ? `${name} (${moreData}) (${label})` : name */
                stringName = moreData !== null && moreData !== '' ? `${name} (${moreData})` : name
            return stringName
        }
        return <span className="mui-formal-select-placeholder">{ placeholder }</span>
    }

    const renderMenuItems = ({ data, transformData }) => data?.map((i: any) => {

        /* console.log('\n')
        console.log(data)
        console.log(transformData) */

        const key = getFromTransformData({ value: i, transformData, field: 'id' }),
            name = getFromTransformData({ value: i, transformData, field: 'name' }),
            /* label = getFromTransformData({ value: i, transformData, field: 'label' }), */
            moreData = getFromTransformData({ value: i, transformData, field: 'moreData' }),
            stringName = moreData !== null && moreData !== '' ? `${name} (${moreData})` : name
        return (
            <MenuItem
                key={ key }
                value={ key }
            >
                { stringName }
            </MenuItem>
        )
    })

    // const touched = touche[name],
    const error = Boolean(errors[name])
    return (
        <FormControl
            className={ className }
            error={ error }
            fullWidth
            { ...controlProps }
        >
            { label && (
                <InputLabel
                    { ...restLabelProps }
                    htmlFor={ `${shortId()}` }
                >
                    { label }
                </InputLabel>
            ) }
            <RealMUISelect
                displayEmpty
                size="small"
                name={ name }
                onBlur={ onBlur }
                label={ label }
                onChange={ _handleChangeSelect }
                renderValue={ renderValue }
                value={ value }
                { ...rest }
                MenuProps={{
                    ...Object.assign({}, MenuProps, {
                        PaperProps: {
                            style: {
                                transform: 'translate3d(0, 0, 0)'
                            }
                        }
                    })
                }}
                SelectDisplayProps={{
                    ...Object.assign({}, SelectDisplayProps, {
                        name,
                        label,
                        id: name
                    })
                }}
                disabled={ disabled || isSubmitting && loading }
            >
                <MenuItem value=""><em>Limpiar</em></MenuItem>
                {/* <MenuItem disabled value={ value }/> */}
                { !loading && renderMenuItems({ data, transformData })}
            </RealMUISelect>
            { error && <FormHelperText>{ errors[name] }</FormHelperText> }
        </FormControl>
    )
}

Select.defaultProps = {
    childProps  : {},
    disabled    : false
}

Select.propTypes = {
    dataProps: PropTypes.shape({
        data          : PropTypes.arrayOf(PropTypes.object),
        getValue      : PropTypes.func,
        loading       : PropTypes.bool,
        transformData : PropTypes.shape({
            id          : transformDataPropType,
            name        : transformDataPropType,
            moreData    : transformDataPropType
        })
    }).isRequired,
    formProps    : PropTypes.object.isRequired,
    name         : PropTypes.string.isRequired,
    onBlur       : PropTypes.func.isRequired,
    onChange     : PropTypes.func.isRequired,
    disabled     : PropTypes.bool,
    value        : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    childProps : PropTypes.object,
    select     : PropTypes.array,
    execute    : PropTypes.func,
    dependence : PropTypes.object
}

export default Select