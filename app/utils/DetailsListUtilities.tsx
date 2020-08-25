import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import React from 'react';
import { SongData } from './CSVUtilities';
import { getUniqueValuesByField } from './ArrayUtilities';
import { convertToTitleCase } from './StringUtilities';

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
 * Get the display name associated with this `field`
 * @param field Field to convert to a display name
 */
export const getDisplayName = (field: string): string => {
  let displayName;
  switch (field) {
    case 'id':
      displayName = 'ID';
      break;
    default:
      displayName = convertToTitleCase(field.replace(/_/g, ' '));
  }
  return displayName;
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
  return allFields.map((field) => {
    const displayName = getDisplayName(field.name);
    const uniqueValueLengths = getUniqueValuesByField(field.name, objects).map(
      (item) => `${item}`.length
    );
    const defaultColumnSize = Math.min(
      Math.floor(window.innerWidth / 2),
      10 * Math.max(field.name.length, ...uniqueValueLengths)
    );
    return {
      key: `column_${field.name}`,
      name: displayName,
      fieldName: field.name,
      // Expand column to fit contents up to half window width
      minWidth: defaultColumnSize,
      isResizable: true,
      isCollapsable: false,
      data: field.dataType,
      // eslint-disable-next-line react/display-name
      onRender: (item: SongData) => {
        return <span>{`${Reflect.get(item, field.name)}`}</span>;
      },
    } as IColumn;
  });
};
