/* eslint-disable no-unused-vars */
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
/**
* * React.useState : Controla el estado de la ventana de confirmacion
* * open : Estado de la ventana
* * setOpen : Funcion para cambiar el estado de la ventana
* * text : Texto a mostrar en la ventana
* * title : Titulo de la ventana
* * show : Estado de la ventana
* */

const ModalConfirmation = ({ text, title, open, close, handleConfirm, optional }) => {
    return(
        <div>
            <Dialog
                open={ open }
                onClose={ () => close() }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    { title }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { text }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => handleConfirm() } variant='contained' color='primary'>
                        { optional === true ? 'Si' : 'Confirmar' }
                    </Button>
                    <Button onClick={ () => close() } autoFocus variant='outlined' color='secondary'>
                        { optional === true ? 'No' : 'Cancelar' }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    
}

ModalConfirmation.defaultProps = { 
    optional: false
}

ModalConfirmation.propTypes = {
    text          : PropTypes.string.isRequired,
    title         : PropTypes.string.isRequired,
    open          : PropTypes.bool.isRequired,
    close         : PropTypes.func.isRequired,
    handleConfirm          : PropTypes.func.isRequired
}

/* console.log(ModalConfirmation) */
export default ModalConfirmation