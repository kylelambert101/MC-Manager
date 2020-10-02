/**
 * Get a list of all unique values of object.`field` from the
 * list of `objects`
 * @param field Field to query on each object
 * @param objects List from which to aggregate object values
 */
export const getUniqueValuesByField = (
  field: string,
  objects: any[]
): any[] => {
  // Get all unique values of obj.`field` in the array
  return (
    objects
      // Get all values of object.field
      .map((obj) => Reflect.get(obj, field))
      // Filter to unique, defined values
      .filter((value, index, self) => {
        return self.indexOf(value) === index && typeof value !== 'undefined';
      })
  );
};

export type CompareOptions = {
  /**
   * Whether to ignore relative sort order of items in compared arrays
   */
  ignoreOrder: boolean;
};

/**
 * Compare two arrays via simple stringification
 * @param arr1 First array to compare
 * @param arr2 Second array to compare
 * @param options CompareOptions to alter comparison logic
 */
export const areIdenticalArrays = (
  arr1: unknown[],
  arr2: unknown[],
  options?: CompareOptions
): boolean => {
  if (options?.ignoreOrder) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};
