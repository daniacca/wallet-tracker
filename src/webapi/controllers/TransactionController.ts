import { ITransaction } from "../models/interfaces/ITransaction.js";
import { TransactionDocument } from "../models/transaction.js";
import { repositoryFactory } from "../repository/repositoryFactory.js";
import { Get, Post, Put, Delete, Route, Body, Path, Controller, Tags, Security } from "tsoa";

const transaction = repositoryFactory("Transaction");

interface TransactionDto extends ITransaction {}

@Route("transactions")
@Tags("Transactions")
export class TransactionController extends Controller {
  @Get("/")
  @Security("jwt")
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
  @Security("jwt")
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
  @Security("jwt")
  public async create(@Body() data: TransactionDto): Promise<string> {
    const doc = (await transaction.create(data)) as TransactionDocument;
    return doc._id;
  }

  @Put("/:id")
  @Security("jwt")
  public async update(@Path() id: string, @Body() data: TransactionDto): Promise<boolean> {
    return await transaction.update(id, data);
  }

  @Delete("/:id")
  @Security("jwt")
  public async remove(@Path() id: string): Promise<boolean> {
    return await transaction.delete(id);
  }
}
