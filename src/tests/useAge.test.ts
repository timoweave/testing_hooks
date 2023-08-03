import { describe, test, expect } from "vitest";
import { useAge } from "../hooks/useAge";
import { renderHook, waitFor } from "@testing-library/react";

describe("useAge hook", () => {
  test("initial", async () => {
    const rendered = renderHook(() => useAge({ oneYearInMilliSecond: 1_000 }));
    const age = () => rendered.result.current;

    expect(age().isBaby).toBeTruthy();

    await waitFor(() => age().setAge(5));
    expect(age().isKid).toBeTruthy();

    await waitFor(() => age().setAge(10));
    expect(age().isTeenager).toBeTruthy();

    await waitFor(() => age().setAge(19));
    expect(age().isTeenager).toBeTruthy();

    await waitFor(() => age().setAge(65));
    expect(age().isSenior).toBeTruthy();
  });

  test("age group, increment age by useEffect and setInterval", async () => {
    const rendered = renderHook(() => useAge({ oneYearInMilliSecond: 1 }));
    const age = () => rendered.result.current;

    const waitForOpt = { interval: 1, timeout: 3_000 };
    expect(age().isBaby).toBeTruthy();

    await waitFor(() => expect(age().age).toEqual(5), waitForOpt);
    expect(age().isKid).toBeTruthy();

    await waitFor(() => expect(age().age).toEqual(10), waitForOpt);
    expect(age().isTeenager).toBeTruthy();

    await waitFor(() => expect(age().age).toEqual(15), waitForOpt);
    expect(age().isTeenager).toBeTruthy();

    await waitFor(() => expect(age().age).toEqual(65), waitForOpt);
    expect(age().isSenior).toBeTruthy();
  });
});
