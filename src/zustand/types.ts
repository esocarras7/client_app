export interface AppState {
    gateways: Gateway[] 
    getAllGateways: () => void
    //addGateway: (gateway: Gateway) => void
}

export interface Gateway {
    id: number 
    serialNumber: string | null
    name: string | null
    ipAddress: string | null
    devices: Device[] 
}

export interface GatewayDto {
    serialNumber: string | null
    name: string | null
    ipAddress: string | null
    devices: Device[]
}

export interface Device {
    vendor: string 
    createdDate: Date | undefined
    status: string 
}

export interface Details {
    gtwyDetails: Gateway | null
    gatewayDetails: (gatewayId: number) => void
}

export interface AddGateway {
    addGateway: (gateway: GatewayDto) => void
    addNotification: (value: boolean) => void
}

export interface RemoveGateway {
    idGateway: number
    removeGateway: (gatewayId: number) => void
    removeNotification: (value: boolean) => void
}

export interface RemoveDevice {
    idGateway: number
    idDevice: number
    removeDevice: (gatewayId: number, deviceId: number) => void
    removeNotification: (value: boolean) => void
}

export interface AddDevice {
    idGateway: number
    addDevice: (gatewayId: number, device: Device) => void
    addNotification: (value: boolean) => void
}

export type Operation = {
    changeOperation: (enable: boolean) => void
}