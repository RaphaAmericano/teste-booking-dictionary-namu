import { RedisClient } from "./RedisClient"

export class RedisCache {
    
    
    public async set(key: string, value: any, ttl: number): Promise<void>{
        const redis = await RedisClient.getInstance();
        console.log(redis)
        const value_string = JSON.stringify(value)

        if(ttl){
            await redis.set(key, value_string, { EX: ttl })
        } else {
            await redis.set(key, value_string)
        }

    }
    public async get(key: string ): Promise<any> {
        const redis = await RedisClient.getInstance();
        const value = await redis.get(key)

        return value ? ( JSON.parse(value) ) : null

    }
    public async delete(key: string): Promise<void> {
        const redis = await RedisClient.getInstance();
        await redis.del(key)
    }

}