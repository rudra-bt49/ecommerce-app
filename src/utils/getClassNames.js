/**
 * ✅ Conditional class helper
 * @param {boolean} condition
 * @param {string} truthyClass
 * @param {string} falsyClass
 * @param {string} defaultClass
 * @returns {string}
 */
const getClassNames = (
  condition,
  truthyClass = "",
  falsyClass = "",
  defaultClass = ""
) =>
  [defaultClass, condition ? truthyClass : falsyClass]
    .filter(Boolean)
    .join(" ");

export default getClassNames;
