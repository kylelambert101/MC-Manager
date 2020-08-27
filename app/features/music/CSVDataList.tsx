import * as React from 'react';
import {
  IColumn,
  DetailsList,
  CheckboxVisibility,
  IDetailsHeaderProps,
  IDetailsColumnRenderTooltipProps,
  DetailsListLayoutMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { useSelector, useDispatch } from 'react-redux';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { getDummySongData, SongData } from '../../utils/CSVUtilities';
import {
  getColumnsFromObjectArray,
  TypedProperty,
} from '../../utils/DetailsListUtilities';
import { songs, toggleSongInclude } from './musicSlice';

/**
 * Get the component that should be used for a particular column's items
 * @param songData SongData item represented in the row
 * @param field TypedProperty of the songData to render
 * @param dispatch react redux dispatch function
 */
const getFieldAdjustedComponent = (
  songData: SongData,
  field: TypedProperty,
  dispatch: React.Dispatch<any>
) => {
  const fieldValue = Reflect.get(songData, field.name);
  let itemComponent;
  switch (field.name) {
    // ID Column
    case 'id':
      itemComponent = (
        <span style={{ fontFamily: 'monospace', color: 'grey' }}>
          <>{`${fieldValue}`}</>
        </span>
      );
      break;
    case 'include':
      itemComponent = (
        <Checkbox
          checked={Boolean(fieldValue)}
          boxSide="end"
          styles={{
            root: {
              marginLeft: '0.75em',
            },
          }}
          onChange={() => {
            dispatch(toggleSongInclude(songData));
          }}
        />
      );
      break;
    default:
      itemComponent = <span>{`${fieldValue}`}</span>;
  }
  return itemComponent;
};

/**
 * Get a new IColumn array infused with redux store data
 * @param columns IColumn array
 * @param dispatch react-redux dispatch function
 */
const getReduxAugmentedColumns = (
  columns: IColumn[],
  dispatch: React.Dispatch<any>
): IColumn[] => {
  return columns.map((column) => ({
    ...column,
    onRender: (item: SongData) => {
      return getFieldAdjustedComponent(
        item,
        { name: column.fieldName, dataType: column.data } as TypedProperty,
        dispatch
      );
    },
  }));
};

/**
 * CSVDataList - An DetailsList wrapper to represent music_collection csv data
 */
const CSVDataList = (): React.ReactElement => {
  // Get song data from redux store
  const songData = useSelector(songs);
  const dispatch = useDispatch();

  // const items = getDummySongData();
  const items = songData;

  /*
   * Since CSV columns are validated to match expected order, the ternary
   * below should return the same columns for both paths, but I'm leaving it
   * just in case there is a desire to dynamically show columns in a
   * non-validated CSV at some point.
   */
  let columns: IColumn[] =
    items.length === 0
      ? // There is no song data loaded so use dummy data for column population
        getColumnsFromObjectArray(getDummySongData())
      : // Song data was loaded - use the columns from the file
        getColumnsFromObjectArray(items);

  // Infuse columns with redux state
  columns = getReduxAugmentedColumns(columns, dispatch);

  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
    props,
    defaultRender
  ) => {
    if (!props || !defaultRender) {
      return null;
    }
    // This tooltip stuff keeps headers aligned with columns during horizontal scroll
    const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = (
      tooltipHostProps
      // eslint-disable-next-line react/jsx-props-no-spreading
    ) => <TooltipHost {...tooltipHostProps} />;
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
        {defaultRender({
          ...props,
          onRenderColumnHeaderTooltip,
        })}
      </Sticky>
    );
  };
  return (
    <DetailsList
      columns={columns}
      items={items}
      checkboxVisibility={CheckboxVisibility.hidden}
      onRenderDetailsHeader={onRenderDetailsHeader}
    />
  );
};

export default CSVDataList;
