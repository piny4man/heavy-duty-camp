export type AccountResult = {
  result: {
    balance: number;
    info?: {
      name: string;
      symbol: string;
      image: string;
    };
  };
};
