interface CacheServiceProps { 
    setFunction: (key: string, value: any, ttl: number) =>  Promise<void>
    getFunction: (key: string) => Promise<any>
    deleteFunction: (key:string) => Promise<any>
}

export class CacheService {
    private setFunction: (key: string, value: any, ttl: number) =>  Promise<void>
    private getFunction: (key: string) => Promise<any>
    private deleteFunction: (key:string) => Promise<any>

    constructor(props: CacheServiceProps){
        this.setFunction = props.setFunction;
        this.getFunction = props.getFunction
        this.deleteFunction = props.deleteFunction;
    }

    async set(key: string, value: any, ttl: number = 3600): Promise<void>{
        await this.setFunction(key, value, ttl)
    }

    async get(key: string): Promise<any>{
        const value = await this.getFunction(key)
        return value
    }
    async delete(key: string): Promise<any>{
        await this.deleteFunction(key)
    }
}