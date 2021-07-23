import React, { CSSProperties, useState } from 'react';
import { Modal, Row, Col, Button, Form, message, Input } from 'antd';
import { GatewayDto, AddGateway } from '../../zustand/types';
import useMyStore from '../../zustand/add_gateway'
import moment from 'moment'

import './AddGateway.css'

const title = 'Add New Gateway'
const cancel = 'Cancel'
const save = 'Save'

const titleStyle: CSSProperties = {
    textAlign: 'start',
    font: 'normal normal normal 18px/20px Fira Sans'
};

const modalStyle: CSSProperties = {
    height: '300px'
}

const ModalTitle: React.FC<{}> = () => (
    <label style={titleStyle}>{title}</label>
)

const formItemLayout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 24,
    },
}

const useStore = useMyStore

const AddNewGateway: React.FC<AddGateway> = ({ addNotification }) => {

    //Retrieving the sotre
    const addingGateway = useStore(state => state.addGateway)

    //Defining the state
    const [visible, setVisible] = useState<boolean>(false)
    const [serialNumber, setSerialNumber] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [ipAddress, setIpAddress] = useState<string>('')

    const newGateway: GatewayDto = {
        serialNumber: serialNumber,
        name: name,
        ipAddress: ipAddress,
        devices: []
    }

    const showModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false)
        clearFields()
    }

    const validateString = (value: string) => {
        var pattern = new RegExp(/^[A-Za-z0-9\s]+$/g);
        var result = pattern.test(value);
        return result
    };

    const validateIpAddress = (value: string) => {
        var pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g);
        var result = pattern.test(value);
        return result
    };

    const saveGateway = () => {
        addingGateway(newGateway)
        closeModal()
        message.success({
            content: "Successful Operation!",
            duration: 2,
            className: 'success_message',
            style: {
                textAlign: 'center',
                font: 'normal normal normal 18px / 20px Fira Sans',
                letterSpacing: '1px',
                color: '#000000d6',
                opacity: 1
            },
            onClose: updateTable
        })
    }

    const updateTable = () => {
        addNotification(true)
        setVisible(false)
    }

    const handleSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSerialNumber(e.target.value)
    }
    const handleNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleIPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIpAddress(e.target.value)
    }

    const clearFields = () => {
        setSerialNumber('')
        setName('')
        setIpAddress('')
    }

    return (
        <React.Fragment>
            <Button type='primary' onClick={showModal}>Add Gateway</Button>
            <Modal
                title={<ModalTitle key={title + moment()} />}
                bodyStyle={modalStyle}
                width={400}
                visible={visible}
                centered={true}
                closable={false}
                footer={[
                    <div>
                        <Button type='default' onClick={closeModal} className='modal_close_btn'>{cancel}</Button>
                        <Button
                            type='primary' onClick={validateString(serialNumber) && validateString(name) && validateIpAddress(ipAddress) ? saveGateway : () => { }}
                            className='modal_close_btn'
                            disabled={!(validateString(serialNumber) && validateString(name) && validateIpAddress(ipAddress))}
                        >{save}</Button>
                    </div>
                ]}
            >
                <Row
                    justify="start"
                    align="middle"
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                    <Row
                        justify="space-between"
                        align="middle"
                        className='add_gateway_row'
                    >
                        <Col flex='360px' className='add_gtwy_form_column'>
                            <Form {...formItemLayout}
                                layout='vertical'
                                className='device_form_style form_align'
                                onFinish={saveGateway}
                            >
                                <Form.Item
                                    label='Serial Number'
                                    validateStatus={validateString(serialNumber) ? 'success' : 'error'}
                                    help={!validateString(serialNumber) && 'Should be combination of numbers & alphabets'}
                                    hasFeedback
                                >
                                    <Input
                                        name='serialNumber'
                                        placeholder='Serial Number'
                                        value={serialNumber}
                                        onChange={handleSNChange}
                                        required
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Name"
                                    validateStatus={validateString(name) ? 'success' : 'error'}
                                    help={!validateString(name) && 'Should be combination of numbers & alphabets'}
                                    hasFeedback
                                >
                                    <Input
                                        name='name'
                                        placeholder='Name'
                                        value={name}
                                        onChange={handleNChange}
                                        required
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ip Address"
                                    validateStatus={validateIpAddress(ipAddress) ? 'success' : 'error'}
                                    help={!validateIpAddress(ipAddress) && 'Should be an Ip Address!'}
                                    hasFeedback
                                >
                                    <Input
                                        name='ipAddress'
                                        placeholder='Ip Address'
                                        value={ipAddress}
                                        onChange={handleIPChange}
                                        required
                                    />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Row>
            </Modal>
        </React.Fragment >
    )
}

export default AddNewGateway
