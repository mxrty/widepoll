import validInfo from "../middleware/validInfo.ts";

describe("My Test Suite", () => {
  it("My Test Case", () => {
    expect(true).toEqual(true);
    validInfo();
  });
});
