import React from "react";
import { create } from "react-test-renderer";
import { ProfileStatus } from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.getInstance();
    // @ts-ignore
    expect(instance.state.status).toBe("it-kamasutra");
  });

  test("after creation span should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    let span = root?.findByType("span");
    // @ts-ignore
    expect(span?.children[0]).toBe("it-kamasutra");
  });
});
