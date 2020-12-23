const { getGoogleClientId } = require("../lib/plugin");

let windowSpy;
let tracker = {};

beforeAll(() => {
  process.client = true;
  windowSpy = jest.spyOn(window, "window", "get");
  jest.useFakeTimers();
});

test("returns a GA client ID when window.ga exists", async () => {
  windowSpy.mockImplementation(() => {
    const ga = (fn) => fn();
    ga.getAll = () => [{ get: (property) => tracker[property] }];
    ga.q = [];

    return { ga };
  });

  tracker.clientId = "12345";
  const clientId = await getGoogleClientId();
  expect(clientId).toBe("12345");
  windowSpy.mockRestore();
});

test("logs an error when window.ga does not exist", async () => {
  const consoleWarn = jest.spyOn(global.console, "warn");
  await getGoogleClientId();
  expect(consoleWarn).toBeCalled();
});
