import * as React from 'react';
import { IColumn, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
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

  const columns: IColumn[] = getColumnsFromObjectArray(items);
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
        />
        {/* </ScrollablePane> */}
      </Fabric>
    </>
  );
};

export default CSVDataList;
