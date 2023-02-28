import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ProfileStatus from "../ProfileStatusHook";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("ProfileStatus component",()=>{
    test("status from props should be in the span", () =>{
        act(()=>{
            render(<ProfileStatus status="da" />, container)
        })
        expect(container.textContent).toBe("da");
    });
});