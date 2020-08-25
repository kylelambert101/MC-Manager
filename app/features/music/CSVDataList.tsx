import * as React from 'react';
import {
  IColumn,
  DetailsList,
  CheckboxVisibility,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { useSelector } from 'react-redux';
import { getDummySongData, SongData } from '../../utils/CSVUtilities';
import { getColumnsFromObjectArray } from '../../utils/DetailsListUtilities';
import { songs } from './musicSlice';

const CSVDataList = (): React.ReactElement => {
  //   const columns: IColumn[] = [
  //     {
  //       key: 'column1',
  //       name: 'id',
  //       fieldName: 'id',
  //       minWidth: 70,
  //       maxWidth: 90,
  //       isResizable: true,
  //       isCollapsable: true,
  //       data: 'number'
  //     }
  //   ];

  const songData = useSelector(songs);

  // const items = getDummySongData();
  const items = songData;

  /*
   * Since CSV columns are validated to match expected order, the ternary
   * below should return the same columns for both paths, but I'm leaving it
   * just in case there is a desire to dynamically show columns in a
   * non-validated CSV at some point.
   */
  const columns: IColumn[] =
    items.length === 0
      ? // There is no song data loaded so use dummy data for column population
        getColumnsFromObjectArray(getDummySongData())
      : // Song data was loaded - use the columns from the file
        getColumnsFromObjectArray(items);

  return (
    <>
      <Fabric>
        {/* <ScrollablePane> */}
        <DetailsList
          // columns={[
          //   {
          //     key: 'column1',
          //     name: 'id',
          //     fieldName: 'id',
          //     minWidth: 70,
          //     maxWidth: 90,
          //     isResizable: true,
          //     isCollapsable: true,
          //     data: 'number'
          //   }
          // ]}
          columns={columns}
          items={items}
          checkboxVisibility={CheckboxVisibility.hidden}
        />
        {/* </ScrollablePane> */}
      </Fabric>
    </>
  );
};

export default CSVDataList;
