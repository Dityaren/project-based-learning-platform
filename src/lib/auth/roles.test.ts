import { describe, expect, it } from "vite-plus/test";

import { hasRole, isUserRole } from "./roles.ts";

describe("isUserRole", () => {
  it.each([
    { value: "student", expected: true },
    { value: "master", expected: true },
    { value: "Teacher", expected: false },
    { value: "", expected: false },
    { value: null, expected: false },
    { value: undefined, expected: false },
  ])("$value → $expected", ({ value, expected }) => {
    expect(isUserRole(value)).toBe(expected);
  });
});

describe("hasRole", () => {
  it("allows a listed role", () => {
    expect(hasRole("teacher", ["teacher", "admin"])).toBe(true);
  });

  it("rejects a role that is not listed", () => {
    expect(hasRole("student", ["teacher", "admin"])).toBe(false);
  });

  it("rejects missing or unknown roles", () => {
    expect(hasRole(null, ["student"])).toBe(false);
    expect(hasRole("superuser", ["student"])).toBe(false);
  });
});
