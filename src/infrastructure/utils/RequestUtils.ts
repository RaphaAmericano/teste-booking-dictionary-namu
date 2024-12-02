export class RequestUtils {
    public static get_request_end_time(start: [number, number]){
        const [seconds, nanoseconds] = process.hrtime(start)
        const durationInMilliseconds = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2)
        return durationInMilliseconds
    }
}