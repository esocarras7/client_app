import create, { GetState, SetState } from 'zustand'
import { RemoveDevice } from './types'

//Remove store
export default create((setState: SetState<RemoveDevice>, getState: GetState<RemoveDevice>): RemoveDevice => {
    return {
        idGateway: 0,
        idDevice: 0,
        removeDevice: async (gatewayId: number, deviceId: number | null | undefined) => {
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
                                    op: 'remove',
                                    path: `/devices/${deviceId}`
                                }
                            ]
                        )
                    })
                const gtwyDetails = await result.json()

            } catch (error) {
                console.log(error);
            }
        },
        removeNotification: () => {}
    }
})

