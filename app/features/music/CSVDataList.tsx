import * as React from 'react';
import {
  IColumn,
  DetailsList,
  CheckboxVisibility,
  IDetailsHeaderProps,
  IDetailsColumnRenderTooltipProps,
  ConstrainMode,
  DetailsListLayoutMode,
  IDetailsListStyles,
} from 'office-ui-fabric-react/lib/DetailsList';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getDummySongData, SongData } from '../../utils/CSVUtilities';
import { getColumnsFromObjectArray } from '../../utils/DetailsListUtilities';
import ActiveCheckbox from './ActiveCheckbox';
import songDataFields from '../../constants/songDataFields.json';
import { TypedProperty } from '../../utils/ObjectUtilities';

interface ICSVDataListProps {
  songs: SongData[];
  onSongChange: (newSong: SongData) => void;
}

/**
 * Get the component that should be used for a particular column's items
 * @param songData SongData item represented in the row
 * @param field TypedProperty of the songData to render
 * @param dispatch react redux dispatch function
 */
const getFieldAdjustedComponent = (
  songData: SongData,
  field: TypedProperty,
  onChange: (songData: SongData) => void
) => {
  const fieldValue = Reflect.get(songData, field.name);
  let itemComponent;
  switch (field.name) {
    case songDataFields.ID.name:
      itemComponent = (
        <span style={{ fontFamily: 'monospace', color: 'grey' }}>
          <>{`${fieldValue}`}</>
        </span>
      );
      break;
    case songDataFields.ACTIVE.name:
      itemComponent = (
        <ActiveCheckbox
          active={songData.active}
          onChange={(newValue: boolean) => {
            onChange({ ...songData, active: newValue });
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
 * CSVDataList - An DetailsList wrapper to represent music_collection csv data
 */
const CSVDataList = (props: ICSVDataListProps): React.ReactElement => {
  const { songs, onSongChange } = props;

  // const items = getDummySongData();
  const items = songs;

  /*
   * Memoizing the columns array in this way prevents it from being recalculated every time a
   * single datapoint changes, which dramatically improves the performance of such events, e.g.
   * an `active` checkbox toggle.
   *
   * By using only `items.length` in the dependency array, `columns` will be refreshed whenever
   * a row is added or deleted. However, as ESLint points out, leaving the rest of `items` out
   * of the dependency list could cause other issues.
   *
   * A more robust solution (which is not needed at this moment but may be useful in the future)
   * would be to process `items` into an object describing the "shape" of the song data, including
   * things such as field names, field data types, and max/min value lengths for each field. That
   * object could then be used directly to create `columns` and it would be listed in the dependency
   * array below rather than `items.length`.
   */
  const columns: IColumn[] = React.useMemo(() => {
    const rawColumns =
      items.length === 0
        ? // There is no song data loaded so use dummy data for column generation and sizing
          getColumnsFromObjectArray(getDummySongData())
        : // Song data was loaded - use the columns from the file
          getColumnsFromObjectArray(items);
    // Adjust how columns render based on their data
    return rawColumns.map((column) => ({
      ...column,
      onRender: (item: SongData) => {
        return getFieldAdjustedComponent(
          item,
          {
            name: column.fieldName,
            dataType: column.data,
          } as TypedProperty,
          onSongChange
        );
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
    headerProps,
    defaultRender
  ) => {
    if (!headerProps || !defaultRender) {
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
          ...headerProps,
          // Get this useless 16px padding out of here
          styles: { root: { paddingTop: 0 } },
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
      constrainMode={ConstrainMode.unconstrained}
      layoutMode={DetailsListLayoutMode.fixedColumns}
    />
  );
};

export default CSVDataList;
