import { UseCase } from '../abstract';

export class TestConnectionUseCase implements UseCase<Buffer> {

  public async execute(): Promise<Buffer> {
    const buffer = Buffer.alloc(1024 * 1024); // Allocate 1 MB buffer
    return buffer;
  }
}
