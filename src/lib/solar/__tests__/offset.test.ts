import { describe, expect, it } from "vitest";
import { getTargetOffset } from "@/lib/solar/offset";

describe("getTargetOffset", () => {
    it("uses 90% offset for high-bill residential leads", () => {
    expect(
        getTargetOffset({
        customerType: "residential",
        billRange: "250-plus",
        })
    ).toBe(0.9);
    });

    it("uses at least 85% offset for commercial leads", () => {
    expect(
        getTargetOffset({
        customerType: "commercial",
        billRange: "250-plus",
        })
    ).toBe(0.85);
    });
});