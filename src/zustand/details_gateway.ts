import create, {GetState, SetState} from 'zustand'
import { Details } from './types'

//Details store
export default create((setState: SetState<Details>, getState: GetState<Details>): Details => {
    return {
        gtwyDetails: null,
        gatewayDetails: async (gatewayId: number) => {
            try {
                const result = await fetch(`https://localhost:5001/api/gateway/${gatewayId}`)
                const gtwyDetails = await result.json()
                setState({gtwyDetails})

            } catch (error) {
                console.log(error);
            }
        }
    }
})