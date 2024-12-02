import { createClient, RedisClientType } from "redis";

export class RedisClient {
    private static instance: RedisClientType | null
    constructor() {
        console.log('RedisClient constructor');
    }

    public static async getInstance(): Promise<RedisClientType> {
        if(!this.instance){
            this.instance = createClient({
                url: process.env.REDIS_URL
            });

            this.instance.on('error', (err) => console.log('Redis Client Error', err))

            await this.instance.connect();
        }
        return this.instance
    }

    public static async disconnect(): Promise<void> {
        if(this.instance){
            await this.instance.quit()
            this.instance = null
        }
     }

}