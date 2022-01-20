import separateCapitalise from "../Helper-Functions/separateCapitalise";

test("separateCapitalise returns the input string with the first letter capitalised", () => {
  expect(separateCapitalise("hello world")).toStrictEqual("Hello World");
  expect(separateCapitalise("hello-world")).toStrictEqual("Hello World");
  // expect(separateCapitalise("-world")).toStrictEqual("World");
  // expect(separateCapitalise(" hello world")).toStrictEqual("Hello World");
  // expect(separateCapitalise(" -world")).toStrictEqual("World");
  expect(separateCapitalise("not-recommended")).toBe("Not Recommended");
  expect(separateCapitalise("richard")).toBe("Richard");
  expect(separateCapitalise("ACADEMY-SCHOLARS")).toBe("ACADEMY SCHOLARS");
});
