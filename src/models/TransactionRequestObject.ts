export interface ITransactionRequest {
  uid: string | undefined;
  networkType: string;
  methodName: string;
  kwargs: object;
  stampLimit: number;
}

export class TransactionRequest implements ITransactionRequest {
  constructor(
    networkType: string,
    methodName: string,
    kwargs: object,
    stampLimit: number,
    uid: string | undefined = undefined,
  ) {
    this.networkType = networkType;
    this.methodName = methodName;
    this.kwargs = kwargs;
    this.stampLimit = stampLimit;
    this.uid = uid;
  }

  uid: string | undefined;
  networkType: string;
  methodName: string;
  kwargs: object;
  stampLimit: number;
}
