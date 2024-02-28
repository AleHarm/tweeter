import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { Buffer } from "buffer";
import { AuthView, AuthorizationPresenter } from "./AuthorizationPresenter";

export interface RegisterView extends AuthView{
  setImageBytes: Dispatch<SetStateAction<Uint8Array>>;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

export class RegisterPresenter extends AuthorizationPresenter<RegisterView>{

  public handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    this.handleImageFile(file);
  };

  public handleImageFile (file: File | undefined){
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));

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

        this.view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);
    } else {
      this.view.setImageUrl("");
      this.view.setImageBytes(new Uint8Array());
    }
  };
  
  public async doRegister(firstName: string, 
    lastName: string, 
    alias: string, 
    password: string, 
    imageBytes: Uint8Array, 
    rememberMeRef: MutableRefObject<boolean>){

    let [user, authToken] = await this.service.register(
      firstName,
      lastName,
      alias,
      password,
      imageBytes
    );

    this.authenticate(authToken, user, rememberMeRef);
  };

  protected getItemDescription(): string {
    return "register user";
  }
}