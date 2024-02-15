import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { Buffer } from "buffer";

export interface RegisterView{
  navigate: NavigateFunction;
  updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
  displayErrorMessage: (message: string) => void;
  setImageBytes: Dispatch<SetStateAction<Uint8Array>>;
    setImageUrl: Dispatch<SetStateAction<string>>;
}

export class RegisterPresenter{

  private service: UserService;
  private _view: RegisterView;

  public constructor(view: RegisterView){

    this._view = view;
    this.service = new UserService();
  }

  public handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    this.handleImageFile(file);
  };

  public handleImageFile (file: File | undefined){
    if (file) {
      this._view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this._view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);
    } else {
      this._view.setImageUrl("");
      this._view.setImageBytes(new Uint8Array());
    }
  };
  
  public async doRegister(firstName: string, 
    lastName: string, 
    alias: string, 
    password: string, 
    imageBytes: Uint8Array, 
    rememberMeRef: MutableRefObject<boolean>){
    try {
      let [user, authToken] = await this.service.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes
      );

      this._view.updateUserInfo(user, user, authToken, rememberMeRef.current);
      this._view.navigate("/");
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    }
  };

}