import create, { GetState, SetState } from 'zustand'
import { RemoveGateway } from './types'

//Remove store
export default create((setState: SetState<RemoveGateway>, getState: GetState<RemoveGateway>): RemoveGateway => {
    return {
        idGateway: 0,
        removeGateway: async (gatewayId: number) => {
            try {
                const result = await fetch(`https://localhost:5001/api/gateway/${gatewayId}`,
                    {
                        method: 'DELETE'
                    })
                const gtwyDetails = await result.json()
                console.log(gtwyDetails);

            } catch (error) {
                console.log(error);
            }
        },
        removeNotification: () => {}
    }
})