import { Module } from '@nestjs/common';
import { InstallmentController } from './installment.controller';
import { InstallmentService } from './installment.service';
import { Installment, InstallmentSchema } from 'src/schemas/installment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [InstallmentController],
    providers: [InstallmentService],
    exports: [InstallmentService],
    imports: [
        MongooseModule.forFeature([{name: Installment.name, schema: InstallmentSchema}]),
        
    ]
})
export class InstallmentModule {}
