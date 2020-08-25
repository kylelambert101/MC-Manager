import * as React from 'react';
import {
  IColumn,
  DetailsList,
  CheckboxVisibility,
  IDetailsHeaderProps,
  IDetailsColumnRenderTooltipProps,
} from 'office-ui-fabric-react/lib/DetailsList';
import { useSelector } from 'react-redux';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getDummySongData } from '../../utils/CSVUtilities';
import { getColumnsFromObjectArray } from '../../utils/DetailsListUtilities';
import { songs } from './musicSlice';

const CSVDataList = (): React.ReactElement => {
  // Get song data from redux store
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
