import React from "react";
import { ReactPromiseState } from "./index";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("react-promise-state", () => {
  it("Should call render function", () => {
    const fn = jest.fn().mockReturnValue(1);
    const component = mount(
      <ReactPromiseState render={fn} run={async () => 1} />
    );
    expect(fn).toBeCalled();
  });

  it("Should return what render function returns", () => {
    const fn = jest.fn().mockReturnValue(123);
    const component = mount(
      <ReactPromiseState render={fn} run={async () => 1} />
    );
    expect(component.text()).toBe("123");
  });

  it("Should give state parameter to fn", () => {
    const fn = jest.fn().mockReturnValue(null);
    const runMock = jest.fn().mockReturnValue(Promise.resolve(1));
    const component = mount(<ReactPromiseState render={fn} run={runMock} />);

    expect(fn.mock.calls[0][0]).toMatchObject({
      done: false,
      error: null,
      result: null,
      pending: false
    });

    expect(typeof fn.mock.calls[0][0].run).toBe("function");
  });

  it("Should call render function when run called", async () => {
    const fn = jest.fn().mockReturnValue(null);
    const runMock = jest.fn().mockReturnValue(Promise.resolve(1));
    const component = mount(<ReactPromiseState render={fn} run={runMock} />);

    fn.mock.calls[0][0].run();

    await sleep(500);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("Should change it's state to pending when run called", async () => {
    const fn = jest.fn().mockReturnValue(null);
    const runMock = jest.fn().mockReturnValue(Promise.resolve(1));
    const component = mount(<ReactPromiseState render={fn} run={runMock} />);

    fn.mock.calls[0][0].run();

    expect(fn.mock.calls[1][0]).toMatchObject({
      done: false,
      error: null,
      pending: true,
      result: null
    });
  });

  it("Should change it's state when run called and promise resolved", async () => {
    const fn = jest.fn().mockReturnValue(null);
    const runMock = jest.fn().mockReturnValue(Promise.resolve(123));
    const component = mount(<ReactPromiseState render={fn} run={runMock} />);

    fn.mock.calls[0][0].run();

    await sleep(500);

    expect(fn.mock.calls[2][0]).toMatchObject({
      done: true,
      error: null,
      pending: false,
      result: 123
    });
  });

  it("Should change it's state when run called and promise rejected", async () => {
    const fn = jest.fn().mockReturnValue(null);
    const error = new Error();
    const runMock = jest.fn().mockImplementation(async () => {
      throw error;
    });

    const component = mount(<ReactPromiseState render={fn} run={runMock} />);

    fn.mock.calls[0][0].run();

    await sleep(500);

    expect(fn.mock.calls[2][0]).toMatchObject({
      done: true,
      error,
      pending: false,
      result: null
    });
  });

  it("Should call runMock with arguments given to run from renderProp function", () => {
    const fn = jest.fn().mockReturnValue(null);
    const runMock = jest.fn().mockReturnValue(Promise.resolve(123));
    const component = mount(<ReactPromiseState render={fn} run={runMock} />);

    const target = { hello: 1 };

    fn.mock.calls[0][0].run(target);

    expect(runMock).toHaveBeenCalledWith(target);
  });
});
