export namespace AuthInterfaces {
  export namespace Send {
    export interface Login {
      email: string;
      password: string;
    }
  }

  export namespace Receive {
    export interface Login {
      accessToken: string;
      email: string;
      userId: string;
    }
  }
}
