import { prisma } from "../client"
import { wordsSeed } from "./words"

async function main(){
    const data = await wordsSeed()
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
