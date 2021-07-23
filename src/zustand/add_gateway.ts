import create, { GetState, SetState } from 'zustand'
import { AddGateway, GatewayDto } from './types'

//Remove store
export default create((setState: SetState<AddGateway>, getState: GetState<AddGateway>): AddGateway => {
    return {
        addGateway: async (gateway: GatewayDto) => {
            try {
                const result = await fetch(`https://localhost:5001/api/gateway`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: JSON.stringify({
                            serialNumber: gateway.serialNumber,
                            name: gateway.name,
                            ipAddress: gateway.ipAddress,
                            devices: []
                        })
                    })
                const gtwyDetails = await result.json()

            } catch (error) {
                console.log(error);
            }
        },
        addNotification: () => {}
    }
})

