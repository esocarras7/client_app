import React, { CSSProperties, useState, useEffect } from 'react';
import { Modal, Row, Col, Button, Form, Descriptions, Table } from 'antd';
import { ColumnsType } from "antd/es/table";
import './IconDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Device, Gateway } from '../../zustand/types';
import useMyStore from '../../zustand/details_gateway'
import IconRemoveDevice from './IconRemoveDevice';
import AddNewDevice from './AddDevice'
import moment from 'moment'

const title = 'Gateway Details'
const close = 'Close'

const titleStyle: CSSProperties = {
    textAlign: 'start',
    font: 'normal normal normal 18px/20px Fira Sans'
};

const modalStyle: CSSProperties = {
    height: '450px'
}

const ModalTitle: React.FC<{}> = () => (
    <label style={titleStyle}>{title}</label>
)

const useStore = useMyStore

const IconDetails: React.FC<Gateway> = ({ id }) => {
    //Defining the state
    const [visible, setVisible] = useState<boolean>(false)

    //Retrieving the sotre
    const getGatewayDetails = useStore(state => state.gatewayDetails)
    const gtwyDetails = useStore(state => state.gtwyDetails)

    //Defining the columns of the table
    const columns: ColumnsType<Device> = [
        {
            align: 'left',
            key: 'vendor',
            title: 'Vendor',
            dataIndex: 'vendor',
            className: 'table_column',
            width: 150
        },
        {
            align: 'left',
            key: 'createdDate',
            title: 'Created Date',
            dataIndex: 'createdDate',
            className: 'table_column',
            width: 120,
            render: (value: any, record: Device, index: number) => {
                let meses: Array<string> = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                let pureDate: Date | undefined = moment(record.createdDate).toDate()
                let formatedDate: string = meses[pureDate.getMonth()] + '/' + pureDate.getDate() + '/' + pureDate.getFullYear()
                return (
                    <span>{formatedDate}</span>
                )
            }
        },
        {
            align: 'left',
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            className: 'table_column',
            width: 70
        },
        {
            align: 'center',
            key: 'remove',
            title: 'Remove',
            dataIndex: 'remove',
            className: 'table_column',
            width: 70,
            render: (value: any, record: Device, index: number) => {
                return (
                    <div className='table_column operation'>
                        <IconRemoveDevice
                            key={index}
                            idGateway={id}
                            idDevice={index}
                            removeDevice={() => { }}
                            removeNotification={removedSuccessfully}
                        />
                    </div>
                )
            }
        }
    ]

    const showModal = () => {
        setVisible(true);
        (async function () {
            getGatewayDetails(id)
        })()

    };

    const closeModal = () => {
        setVisible(false)
    }

    const removedSuccessfully = (enable: boolean) => {
        if (enable === true) {
            (async function () {
                getGatewayDetails(id)
            })()
        }
    }

    const addSuccessfully = (enable: boolean) => {
        if (enable === true) {
            (async function () {
                getGatewayDetails(id)
            })()
        }
    }

    return (
        <React.Fragment>
            <FontAwesomeIcon icon={faEye} onClick={showModal} />
            <Modal
                title={<ModalTitle />}
                bodyStyle={modalStyle}
                width={465}
                visible={visible}
                centered={true}
                closable={false}
                footer={[
                    <Button type='primary' onClick={closeModal} className='modal_close_btn'>{close}</Button>
                ]}
            >
                <Row
                    justify="start"
                    align="middle"
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                    <Row
                        justify="start"
                        align="middle"
                        className='description_row'
                    >
                        <Col flex='300px'>
                            <Descriptions
                                size='middle'
                                className='description'
                            >
                                <Descriptions.Item>
                                    <Row justify="start"
                                        align="middle"
                                    >
                                        <Col flex={5} className='description_column'>
                                            <div>
                                                <strong>Serial Number: </strong>
                                                <span>{gtwyDetails?.serialNumber}</span>
                                            </div>
                                            <div>
                                                <strong>Name: </strong>
                                                <span>{gtwyDetails?.name}</span>
                                            </div>
                                            <div>
                                                <strong>Ip Address: </strong>
                                                <span>{gtwyDetails?.ipAddress}</span>
                                            </div>
                                            <div>
                                                <strong>Devices: </strong>
                                            </div>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col flex='100px' className='column_add_device'>
                            <AddNewDevice
                                key={`new_device${moment()}`}
                                idGateway={id}
                                addDevice={() => { }}
                                addNotification={addSuccessfully}
                            />
                        </Col>
                    </Row>
                    <Row
                        justify="start"
                        align="middle"
                        className='description_row'
                    >
                        <Col flex={24}>
                            <Table<Device>
                                size='small'
                                bordered={true}
                                style={{ border: '1px solid black' }}
                                columns={columns}
                                dataSource={gtwyDetails?.devices}
                                className='devices_table'
                                pagination={{ defaultPageSize: 5 }}
                            />

                        </Col>
                    </Row>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default IconDetails
