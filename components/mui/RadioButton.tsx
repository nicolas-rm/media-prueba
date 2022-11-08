import React from 'react'
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import PropTypes from 'prop-types'

const MuiRadioButton = ({ name, dataProps, legend, formProps }) => {
    const [value, setValue] = React.useState<any>(null)

    return (
        <FormControl sx={{ mx: 3 }}>
            <FormLabel id="radioButton-label">{ legend }</FormLabel>
            <RadioGroup
                row
                aria-labelledby="radioButton-label"
                name={ name }
                value={ value }
                onChange={ event => {
                    setValue(event.target.value)
                    formProps.setFieldValue(name, event.target.value)
                } }
            >
                {
                    dataProps.map((option: any, index) => {
                        return (
                            <FormControlLabel key={ index } value={ option.value } control={ <Radio color="success" /> } label={ option.label } disabled={ option.disabled } />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    )
}

MuiRadioButton.defaultProps = {
    placeholder : '',
    label       : ''
}

MuiRadioButton.propTypes = {
    name        : PropTypes.string.isRequired,
    dataProps   : PropTypes.array.isRequired,
    legend      : PropTypes.string,
    formProps   : PropTypes.object.isRequired
}

export default MuiRadioButton