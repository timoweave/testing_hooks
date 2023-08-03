import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost/strings", (_req, resp, ctx) => {
    return resp(ctx.status(200), ctx.json(["alpha", "beta", "gama"]));
  }),
  rest.get("http://localhost/numbers", (_req, resp, ctx) => {
    return resp(ctx.status(200), ctx.json([1, 2, 3]));
  }),
  rest.get("http://localhost/stock/VOO", (_req, resp, ctx) => {
    return resp(
      ctx.status(200),
      ctx.json({
        symbol: "VOO",
        price: 450.0,
      })
    );
  }),
];
