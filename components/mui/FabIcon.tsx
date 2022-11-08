import PropTypes from 'prop-types'
import { Fab } from "@mui/material"
import React from 'react'
import theme from '../../src/theme'

export const FabIcon = ({ id, variant, size, sx, onClick, ariaControls, ariaHaspopup, ariaExpanded, color, hover, icon, disabled }) => {
    const selectColor = () => {
        let secondary
        switch (hover) {
            case 'primary':
                secondary = theme.palette.primary.main
                break
    
            case 'secondary':
                secondary = theme.palette.secondary.main
                break
    
            case 'error':
                secondary = theme.palette.error.main
                break
            default:
                secondary = theme.palette.secondary.main
        }
        return secondary
    }

    return (
        <Fab id={ id } variant={ variant } size={ size } sx={{ ...sx, '&:hover': { backgroundColor: selectColor() } }} color={ color } onClick={ onClick } aria-controls={ ariaControls } aria-haspopup={ ariaHaspopup } aria-expanded={ ariaExpanded } disabled={ disabled }>
            {
                icon
            }
        </Fab>
    )
}

FabIcon.defaultProps = {
    color        : 'primary',
    hover        : 'secondary',
    id           : '',
    variant      : 'circular',
    size         : 'small',
    sx           : {},
    // eslint-disable-next-line no-unused-vars
    onClick      : (any?: any) => {},
    ariaControls : '', 
    ariaHaspopup : '',
    ariaExpanded : '',
    icon         : '',
    disabled     : false
}

FabIcon.prototype = {
    color        : PropTypes.string.isRequired,
    hover        : PropTypes.string.isRequired,
    size         : PropTypes.string.isRequired,
    icon         : PropTypes.string.isRequired,
    variant      : PropTypes.string.isRequired,
    id           : PropTypes.string,
    sx           : PropTypes.object,
    onClick      : PropTypes.func,
    ariaControls : PropTypes.any, 
    ariaHaspopup : PropTypes.any,
    ariaExpanded : PropTypes.any,
    disabled     : PropTypes.bool
}

export default FabIcon