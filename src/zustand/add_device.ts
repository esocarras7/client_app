import create, { GetState, SetState } from 'zustand'
import { AddDevice, Device } from './types'

//Remove store
export default create((setState: SetState<AddDevice>, getState: GetState<AddDevice>): AddDevice => {
    return {
        idGateway: 0,
        addDevice: async (gatewayId: number, device: Device) => {
            try {
                const result = await fetch(`http://localhost:5000/api/gateway/${gatewayId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: JSON.stringify(
                            [
                                {
                                    op: 'add',
                                    path: `/devices/-`,
                                    value: {
                                        vendor:device.vendor,
                                        createdDate:device.createdDate,
                                        status:device.status
                                    }
                                }
                            ]
                        )
                    })
                const gtwyDetails = await result.json()
                console.log(gtwyDetails);
            } catch (error) {
                console.log(error);
            }
        },
        addNotification: () => {}
    }
})

