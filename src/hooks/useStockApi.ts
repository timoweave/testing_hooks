import { useState, useEffect, useMemo, useCallback } from "react";
import { fetch } from "cross-fetch";

const fetchStock = async (
  url: string = "http://localhost/stock",
  state?: UseStock
): Promise<Stock> => {
  const response = await fetch(url);
  const stock = (await response.json()) as Stock;
  state?.setStock(stock);
  return stock;
};

interface Stock {
  symbol: string;
  price: number;
}

export interface UseStock {
  stock: Stock | null;
  setStock: React.Dispatch<React.SetStateAction<Stock | null>>;
  fetchStockCallback: () => void;
}

export const useStock = (
  symbol: string = "VOO",
  path: string = "http://localhost/stock"
): UseStock => {
  const [stock, setStock] = useState<Stock | null>(null);

  const url = useMemo(() => `${path}/${symbol}`, [path, symbol]);

  const fetchStockCallback = useCallback(() => {
    fetchStock(url).then((fetchedStock) => {
      setStock(fetchedStock);
    });
  }, [url]);

  useEffect(() => {
    setTimeout(fetchStockCallback, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stock,
    setStock,
    fetchStockCallback,
  };
};
