import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Installment } from 'src/schemas/installment.schema';
import { InstallmentModule } from './installment.module';

@Injectable()
export class InstallmentService {

    constructor(
        @InjectModel(Installment.name) private installmentModel: Model<InstallmentModule>
    ){}

    async createInstallment(installmentAmount: number, lId: string){
        const installmentDto = {
            amount : installmentAmount,
            paidDate: new Date(),
            loanId: lId,
        }

        const insDto = new this.installmentModel(installmentDto);
        insDto.save();

        return "Installment Settled Successfull";

    }
}
