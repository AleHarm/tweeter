export interface View{
  displayErrorMessage: (message: string) => void;
}

export class Presenter{

  private _view: View;


  public constructor(view: View){

    this._view = view;
  }

  protected get view(){

    return this._view;
  }

  public async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string) : Promise<void> {
    try {

      await operation();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to ${operationDescription} because of exception: ${(error as Error).message}`
      );
    }
  };
}