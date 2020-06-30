import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import React from 'react';
import { SongData } from './CSVUtilities';

/**
 * Name and dataType of a property on an object
 */
export type TypedProperty = {
  name: string;
  dataType: string;
};

/**
 * Get the name and datatype of all properties of an object
 * @param object G
 */
export const getProperties = (object: any): TypedProperty[] => {
  return Object.keys(object).map((key) => ({
    name: key,
    dataType: typeof object[key],
  }));
};
/**
 * Get an array of IColumns that can be used for a list of objects
 */
export const getColumnsFromObjectArray = (objects: any[]): IColumn[] => {
  const allFields = objects
    // Get properties of all objects
    .map((obj) => getProperties(obj))
    // Flatten the array of property arrays
    .flat()
    // Stringify each TypedProperty for comparison
    .map((item) => JSON.stringify(item))
    // Filter to unique values
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    // Convert stringified values back to TypedProperty objects
    .map((itemString) => JSON.parse(itemString) as TypedProperty);

  // Order is going to be determined by when the above map function encountered each field
  //   console.log(allFields);

  // Map the allFields array to an array of IColumns, using the name and type
  return allFields.map(
    (field) =>
      ({
        key: `column_${field.name}`,
        name: field.name,
        fieldName: field.name,
        minWidth: 50,
        maxWidth: 200,
        isResizable: true,
        isCollapsable: false,
        data: field.dataType,
        // eslint-disable-next-line react/display-name
        onRender: (item: SongData) => {
          return <span>{`${Reflect.get(item, field.name)}`}</span>;
        },
      } as IColumn)
  );
};
