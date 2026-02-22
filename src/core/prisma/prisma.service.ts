import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/generated/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.getOrThrow<string>('DATABASE_URL'),
    })

    super({ adapter })
  }

  async onModuleInit() {
    const start = Date.now()

    this.logger.log('Connecting to database...')

    try {
      await this.$connect()

      const ms = Date.now() - start

      this.logger.log(`Database connecting (time=${ms}ms)`)
    } catch (e) {
      this.logger.error(`Failed to connect to database: ${e}`)

      throw e
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database...')

    try {
      await this.$disconnect()

      this.logger.log('Database connection close')
    } catch (e) {
      this.logger.error(`Failed to disconnect from database: ${e}`)

      throw e
    }
  }
}
