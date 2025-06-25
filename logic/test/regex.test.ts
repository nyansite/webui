import { it, expect } from "vitest"
import { emailRegex, validateRegex } from "../validate/regex"

it("email regex validation", () => {
    expect(validateRegex(emailRegex, "ciallo@yuzu.com")).toBe(true)
    expect(validateRegex(emailRegex, "123.@c.com")).toBe(false)
})