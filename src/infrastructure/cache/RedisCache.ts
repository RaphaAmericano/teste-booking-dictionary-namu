import { RedisClient } from "./RedisClient"

export class RedisCache {
    private client = RedisClient.getInstance()
    
    public async set(key: string, value: any, ttl: number): Promise<void>{
        const redis = await this.client;
        const value_string = JSON.stringify(value)

        if(ttl){
            await redis.set(key, value_string, {EX: ttl })
        } else {
            await redis.set(key, value_string)
        }

    }
    public async get(key: string ): Promise<any> {
        const redis = await this.client;
        const value = await redis.get(key)

        return value ? ( JSON.parse(value) ) : null

    }
    public async delete(key: string): Promise<void> {
        const redis = await this.client;
        await redis.del(key)
    }

}