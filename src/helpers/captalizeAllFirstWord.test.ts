import { describe, expect, it } from "vitest";
import { capitalizeFirstLetterOfCity } from "./captalizeAllFirstWord";

describe("capitalizeFirstLetterOfCity", () => {
  it.each([
    ["paris", "Paris"],
    ["são paulo", "São Paulo"],
    ["rio de janeiro", "Rio De Janeiro"],
  ])("capitalizes %s as %s", (city, expected) => {
    expect(capitalizeFirstLetterOfCity(city)).toBe(expected);
  });

  it("returns an empty string for an empty name", () => {
    expect(capitalizeFirstLetterOfCity("")).toBe("");
  });

  it("keeps repeated spaces untouched", () => {
    expect(capitalizeFirstLetterOfCity("new  york")).toBe("New  York");
  });
});
