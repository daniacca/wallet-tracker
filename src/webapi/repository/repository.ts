import mongoose, { Document } from "mongoose";
import IWrite from "./interfaces/IWrite.js";
import IRead from "./interfaces/IRead.js";

export class Repository<T extends Document> implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<Document>;

  constructor(schemaModel: mongoose.Model<Document>) {
    this._model = schemaModel;
  }

  public async create(data: any): Promise<T> {
    const doc = new this._model(data);
    await doc.save();
    return doc as T;
  }

  public async findOne(id: string): Promise<T> {
    return await this._model.findOne({ _id: this.toObjectId(id) });
  }

  public async find(): Promise<T[]> {
    return await this._model.find();
  }

  public async update(id: string, data: any): Promise<boolean> {
    const result = await this._model.replaceOne({ _id: this.toObjectId(id) }, data);
    return result.modifiedCount > 0;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this._model.deleteOne({ _id: this.toObjectId(id) });
    return result.deletedCount > 0;
  }

  protected toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}
