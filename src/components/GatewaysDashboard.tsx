import React, { useEffect } from 'react'
import 'antd/dist/antd.css';
import { Button, Row, Col, Card, Table } from 'antd';
import { ColumnsType } from "antd/es/table";
import moment from 'moment'
import useMyStore from '../zustand/all_gateways'
import { AppState, Gateway } from '../zustand/types'
import './GatewaysDashboard.css'
import IconRemoveGateway from '../custom/components/IconRemoveGateway';
import IconDetails from '../custom/components/IconDetails';
import AddNewGateway from '../custom/components/AddGateway';

const useStore = useMyStore;

const GatewaysDashboard: React.FC<AppState> = ({ }) => {
    //Retrieving the store
    const gateways = useStore(state => state.gateways)
    const getAllGateways = useStore(state => state.getAllGateways)

    //Defining the columns of the table
    const columns: ColumnsType<Gateway> = [
        {
            align: 'left',
            key: 'serialNumber',
            title: 'Serial Number',
            dataIndex: 'serialNumber',
            className: 'table_column',
            width: 240
        },
        {
            align: 'left',
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            className: 'table_column',
            width: 340
        },
        {
            align: 'left',
            key: 'ipAddress',
            title: 'Ip Address',
            dataIndex: 'ipAddress',
            className: 'table_column',
            width: 240
        },
        {
            align: 'center',
            key: 'details',
            title: 'Details',
            dataIndex: 'details',
            className: 'table_column',
            width: 140,
            render: (value: any, record: Gateway, index: number) => {
                return (
                    <div className='table_column operation'>
                        <IconDetails
                            key={record.id}
                            id={record.id}
                            serialNumber={null}
                            name={null}
                            ipAddress={null}
                            devices={record.devices}
                        />
                    </div>
                )
            }
        },
        {
            align: 'center',
            key: 'remove',
            title: 'Remove',
            dataIndex: 'remove',
            className: 'table_column',
            width: 140,
            render: (value: any, record: Gateway, index: number) => {
                return (
                    <div className='table_column operation'>
                        <IconRemoveGateway
                            key={record.id}
                            idGateway={record.id}
                            removeGateway={() => { }}
                            removeNotification={removedSuccessfully}
                        />
                    </div>
                )
            }
        }
    ]

    const removedSuccessfully = (enable: boolean) => {
        if (enable === true) {
            getAllGateways()
        }
    }

    const addSuccessfully = (enable: boolean) => {
        if (enable === true) {
            (async function () {
                getAllGateways()
            })()
        }
    }

    //Llamada a la api rest cuando se monte el componente
    useEffect(() => {
        (async function () {
            getAllGateways()
        }
        )()
    }, [])


    return (
        <div className="site-drawer-render-in-current-wrapper" >
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                justify="center"
                align="middle"
                className="site-drawer-render-in-current-wrapper main_row"
            >
                <Col flex={10} className='column_style'>
                    <Row justify="start"
                        align="middle"
                    >
                        <Col flex={4} className='column_style'>
                            <div className='main_text_container'>
                                <h4 className='main_text'>
                                    Gateways Dashboard
                                </h4>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center"
                        align="middle"
                    >
                        <Col flex={10} className='column_style'>
                            <Card bordered={true} style={{ border: '1px solid blue', boxShadow: '0.1em 0.1em 1.5em -0.3em rgb(169, 169, 169)' }}>
                                <Row justify='end' align='middle' className='row_add'>
                                    <Col flex={22}>
                                    </Col>
                                    <Col flex={2} className='column_add_style'>
                                        <AddNewGateway
                                            key={`new_gateway${moment()}`}
                                            addGateway={() => { }}
                                            addNotification={addSuccessfully}
                                        />
                                    </Col>
                                </Row>
                                <Row justify='center' align='middle'>
                                    <Col flex={24}>
                                        <Table<Gateway>
                                            size='small'
                                            bordered={true}
                                            style={{ border: '1px solid black' }}
                                            columns={columns}
                                            dataSource={gateways}
                                            className='table_style'
                                            pagination={{ defaultPageSize: 7 }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </div >
    )
}

export default GatewaysDashboard