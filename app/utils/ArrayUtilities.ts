/**
 * Get a list of all unique values of object.`field` from the
 * list of `objects`
 * @param field Field to query on each object
 * @param objects List from which to aggregate object values
 */
// eslint-disable-next-line import/prefer-default-export
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
