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

export type TransactionsResult = {
  result: Transaction[];
};

type Transaction = {
  timestamp: string;
  fee: number;
  fee_payer: string;
  raw: {
    meta: {
      postTokenBalances: TokenBalances[];
    };
  };
};

type TokenBalances = {
  mint: string;
  owner: string;
};
