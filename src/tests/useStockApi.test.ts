import { describe, test, expect } from "vitest";
import { useStock } from "../hooks/useStockApi";
import { renderHook, waitFor } from "@testing-library/react";
import { timeout } from "./utils";

describe("useStock hook", () => {
  test("initial", async () => {
    const rendered = renderHook(() => useStock("VOO"));
    const stock = () => rendered.result.current;

    expect(stock().stock).toEqual(null);
  });

  test("initial, wait for fetch", async () => {
    const rendered = renderHook(() => useStock("VOO"));
    const stock = () => rendered.result.current;

    await waitFor(() => timeout(1_000), { timeout: 2_000 });
    expect(stock().stock).toEqual({
      symbol: "VOO",
      price: 450.0,
    });
  });
});
