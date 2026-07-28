import {
  formatCardNumber,
  formatCvc,
  formatExpiry,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
} from "./cardValidation";

describe("formatCardNumber", () => {
  it("groups digits into blocks of 4", () => {
    expect(formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
  });

  it("strips non digit characters", () => {
    expect(formatCardNumber("4111-1111-1111-1111")).toBe("4111 1111 1111 1111");
  });

  it("truncates to 16 digits", () => {
    expect(formatCardNumber("41111111111111119999")).toBe(
      "4111 1111 1111 1111"
    );
  });
});

describe("formatExpiry", () => {
  it("inserts a slash after the month once 2 digits are entered", () => {
    expect(formatExpiry("1225")).toBe("12/25");
  });

  it("leaves short input untouched", () => {
    expect(formatExpiry("1")).toBe("1");
  });
});

describe("formatCvc", () => {
  it("strips non digits and truncates to 3 digits", () => {
    expect(formatCvc("12a34567")).toBe("123");
  });
});

describe("isValidCardNumber", () => {
  it("accepts 16 digit numbers", () => {
    expect(isValidCardNumber("4111 1111 1111 1111")).toBe(true);
  });

  it("rejects numbers that are not 16 digits", () => {
    expect(isValidCardNumber("4111 1111")).toBe(false);
  });
});

describe("isValidCvc", () => {
  it("accepts 3 digit codes", () => {
    expect(isValidCvc("123")).toBe(true);
  });

  it("rejects invalid codes", () => {
    expect(isValidCvc("12")).toBe(false);
    expect(isValidCvc("12345")).toBe(false);
    expect(isValidCvc("12a")).toBe(false);
  });
});

describe("isValidExpiry", () => {
  it("accepts a valid future expiry", () => {
    expect(isValidExpiry("12/30")).toBe(true);
  });

  it("rejects an invalid month", () => {
    expect(isValidExpiry("13/30")).toBe(false);
  });

  it("rejects a badly formatted value", () => {
    expect(isValidExpiry("1230")).toBe(false);
  });

  it("rejects an expired date", () => {
    expect(isValidExpiry("01/20")).toBe(false);
  });
});