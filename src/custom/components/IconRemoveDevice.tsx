import React from 'react';
import { message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { RemoveDevice } from '../../zustand/types'
import useMyStore from '../../zustand/remove_device'
import { duration } from 'moment';

const useStore = useMyStore

const IconRemoveGateway: React.FC<RemoveDevice> = ({ idGateway, idDevice, removeNotification }) => {

    //Retrieving the sotre
    const removingDevice = useStore(state => state.removeDevice)

    const handleClick = () => {
        removingDevice(idGateway, idDevice)
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
