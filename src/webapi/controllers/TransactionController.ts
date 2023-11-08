import { ITransaction } from "../models/interfaces/ITransaction.js";
import { TransactionDocument } from "../models/transaction.js";
import { repositoryFactory } from "../repository/repositoryFactory.js";
import { Get, Post, Put, Delete, Route, Body, Path, Controller, Tags } from "tsoa";

const transaction = repositoryFactory("Transaction");

interface TransactionDto extends ITransaction {}

@Route("transactions")
@Tags("Transactions")
export class TransactionController extends Controller {
  @Get("/")
  public async find(): Promise<TransactionDto[]> {
    const result = (await transaction.find()) as TransactionDocument[];
    return result.map((doc) => ({
      _id: doc._id,
      amount: doc.amount,
      type: doc.type,
      description: doc.description,
      userId: doc.userId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  @Get("/:id")
  public async findById(@Path() id: string): Promise<TransactionDto> {
    const doc = (await transaction.findOne(id)) as TransactionDocument;
    return {
      _id: doc._id,
      amount: doc.amount,
      type: doc.type,
      description: doc.description,
      userId: doc.userId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  @Post("/")
  public async create(@Body() data: TransactionDto): Promise<string> {
    const doc = (await transaction.create(data)) as TransactionDocument;
    return doc._id;
  }

  @Put("/:id")
  public async update(@Path() id: string, @Body() data: TransactionDto): Promise<boolean> {
    return await transaction.update(id, data);
  }

  @Delete("/:id")
  public async remove(@Path() id: string): Promise<boolean> {
    return await transaction.delete(id);
  }
}
