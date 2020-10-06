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

export interface SortField {
  fieldName: string;
  direction: 'ascending' | 'descending';
}

export const sortObjectListByFields = (
  objList: Record<string, unknown>[],
  sortFields: SortField[]
): Record<string, unknown>[] => {
  const sorter = (
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>
  ) => {
    let result = 0;
    sortFields.reverse().forEach((sortField) => {
      console.log(
        `sorting by ${sortField.fieldName} in direction "${sortField.direction}"`
      );
      if (
        // result has not been assigned yet
        result === 0 &&
        // Target field values don't match
        Reflect.get(obj1, sortField.fieldName) !==
          Reflect.get(obj2, sortField.fieldName)
      ) {
        switch (sortField.direction) {
          case 'ascending':
            result =
              Reflect.get(obj1, sortField.fieldName) <
              Reflect.get(obj2, sortField.fieldName)
                ? 1
                : -1;
            break;
          case 'descending':
            result =
              Reflect.get(obj1, sortField.fieldName) >
              Reflect.get(obj2, sortField.fieldName)
                ? 1
                : -1;
            break;
          default:
            break;
        }
      }
    });
    return result;
  };
  return objList.sort(sorter);
};
