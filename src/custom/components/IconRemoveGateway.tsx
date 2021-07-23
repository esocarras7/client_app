import React from 'react';
import { message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { RemoveGateway } from '../../zustand/types'
import useMyStore from '../../zustand/remove_gateway'
import { duration } from 'moment';

const useStore = useMyStore

const IconRemoveGateway: React.FC<RemoveGateway> = ({ idGateway, removeNotification }) => {

    //Retrieving the sotre
    const removeGateway = useStore(state => state.removeGateway)
    const handleClick = () => {
        removeGateway(idGateway)
        message.success({
            content: "Successful Operation!",
            className: 'success_message',
            style: {
                textAlign: 'center',
                font: 'normal normal normal 17px / 20px Fira Sans',
                letterSpacing: '1px',
                color: '#000000d6',
                opacity: 1
            },
            onClose: updateTable
        })
    }

    const updateTable = () => {
        removeNotification(true)
    }

    return (
        <FontAwesomeIcon icon={faTrash} onClick={handleClick} />
    )
}



export default IconRemoveGateway
