import create, {GetState, SetState} from 'zustand'
import { AppState } from './types'

//Main store
export default create((setState: SetState<AppState>, getState: GetState<AppState>): AppState => {
    return {
        gateways: [],
        getAllGateways: async function () {
            try {
                const result = await fetch('http://localhost:5000/api/gateway')
                const gateways = await result.json()
                setState({ gateways })
                
            } catch (error) {
                console.log(error);
            }
        }
    }
})

