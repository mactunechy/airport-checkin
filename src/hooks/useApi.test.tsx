import { useApi } from "./useApi";
let apiCall: any;

describe("hooks/", () => {
  beforeEach(() => {
    const service = jest.fn(() => Promise.resolve({ a: "q" }));
    apiCall = useApi<{ a: string }>(service);
  });
  it("should set return data when request is called", async () => {
    await apiCall.request();

    expect(apiCall.data).toHaveProperty("a");
  });
});

export {};
