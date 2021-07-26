import React, { CSSProperties, useState } from 'react';
import { Modal, Row, Col, Button, Form, message, Input, DatePicker, Radio, RadioChangeEvent } from 'antd';
import { AddDevice, Device, Gateway } from '../../zustand/types';
import useMyStore from '../../zustand/add_device'
import moment from 'moment'
import './AddDevice.css'

const title = 'Add Device to this Gateway'
const cancel = 'Cancel'
const save = 'Save'
const offline = 'Offline'
const online = 'Online'

const titleStyle: CSSProperties = {
    textAlign: 'start',
    font: 'normal normal normal 18px/20px Fira Sans'
};

const modalStyle: CSSProperties = {
    height: '270px'
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

const AddNewDevice: React.FC<AddDevice> = ({ idGateway, addNotification }) => {

    //Retrieving the sotre
    const addingDevice = useStore(state => state.addDevice)

    //Defining the state
    const [visible, setVisible] = useState<boolean>(false)
    const [vendor, setVendor] = useState<string>('')
    const [dateValue, setDateValue] = useState<moment.Moment | null>(null)
    const [status, setStatus] = useState<number>(1)
    const [auxGateway, setAuxGateway] = useState<Gateway | any>(null)

    const newDevice: Device = {
        vendor: vendor,
        createdDate: dateValue?.toDate(),
        status: status === 1 ? offline : online
    }

    const showDeviceModal = () => {
        (async function () {
            try {
                const result = await fetch(`http://localhost:5000/api/gateway/${idGateway}`)
                const gtwyDetails = await result.json()
                setAuxGateway(gtwyDetails)

            } catch (error) {
                console.log(error);
            }
        })()
        setVisible(true)
    }

    const closeModal = () => {
        clearFields()
        setVisible(false)
    }

    const validateString = (value: string) => {
        var pattern = new RegExp(/^[A-Za-z0-9\s]+$/g);
        var result = pattern.test(value);
        return result
    };

    const saveDevice = () => {
        if (auxGateway?.devices.length < 10) {
            addingDevice(idGateway, newDevice)
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
        else {
            message.error({
                content: "The amount of devices for each gateway must be less or equal to 10!",
                className: 'success_message',
                style: {
                    textAlign: 'center',
                    font: 'normal normal normal 18px / 20px Fira Sans',
                    letterSpacing: '1px',
                    color: '#000000d6',
                    opacity: 1
                },
                onClose: closeModal
            })
        }
    }

    const updateTable = () => {
        addNotification(true)
        setVisible(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVendor(e.target.value)
    }

    const handleOnChangeDate = (date: moment.Moment | null) => {
        setDateValue(date)
    }

    const handleRadioChange = (e: RadioChangeEvent) => {
        setStatus(e.target.value)
    }

    const clearFields = () => {
        setVendor('')
        setDateValue(null)
        setStatus(1)
    }

    return (
        <React.Fragment>
            <Button type='primary' onClick={showDeviceModal}>Add Device</Button>
            <Modal
                title={<ModalTitle key={title + moment()} />}
                bodyStyle={modalStyle}
                width={465}
                visible={visible}
                centered={true}
                closable={false}
                footer={[
                    <Row
                        justify='end'
                        align="middle"
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    >
                        <Col flex={22}>
                        </Col>
                        <Col flex={2}>
                            <div>
                                <Button type='default' onClick={closeModal} className='modal_close_btn'>{cancel}</Button>
                                <Button
                                    type='primary'
                                    onClick={validateString(vendor) ? saveDevice : () => { }}
                                    className='modal_close_btn'
                                    disabled={!validateString(vendor)}
                                >{save}</Button>
                            </div>
                        </Col>
                    </Row>
                ]}
            >
                <Row
                    justify="start"
                    align="middle"
                    className='description_row'
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                    <Col flex={24} >
                        <Form {...formItemLayout}
                            className='device_form_style'
                            onFinish={saveDevice}
                            layout='vertical'
                        >
                            <Form.Item
                                label='Vendor'
                                validateStatus={validateString(vendor) ? 'success' : 'error'}
                                help={!validateString(vendor) && 'Should be combination of numbers & alphabets'}
                                hasFeedback
                            >
                                <Input
                                    name='vendor'
                                    placeholder='Device vendor'
                                    value={vendor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Item>
                            <Form.Item
                                label='Date'
                            >
                                <DatePicker
                                    id="date"
                                    className='date_style'
                                    format="DD/MM/YYYY"
                                    placeholder="dd/mm/yyyy"
                                    value={dateValue}
                                    onChange={(date) => handleOnChangeDate(date)}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item name="status" label="Status">
                                <Radio.Group value={status} onChange={handleRadioChange}>
                                    <Radio value={1} >Offline</Radio>
                                    <Radio value={2} >Online</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default AddNewDevice
