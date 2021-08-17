import {
  SortField,
  sortObjectListByFields,
} from '../../app/utils/ArrayUtilities';

const testList = [
  { num: 1, text: 'aaa' },
  { num: 1, text: 'bbb' },
  { num: 2, text: 'aaa' },
  { num: 2, text: 'bbb' },
  { num: 3, text: 'aaa' },
  { num: 3, text: 'bbb' },
  { num: 4, text: 'aaa' },
  { num: 4, text: 'bbb' },
];

describe('ArrayUtilities', () => {
  describe('sortObjectListByFields', () => {
    it('sorts asc by single field', () => {
      const sortFields = [
        { fieldName: 'num', direction: 'ascending' },
      ] as SortField[];

      const sorted = sortObjectListByFields(testList, sortFields);

      expect(sorted).toEqual(testList);
    });
    it('sorts desc by single field', () => {
      const sortFields = [
        { fieldName: 'num', direction: 'descending' },
      ] as SortField[];

      const sorted = sortObjectListByFields(testList, sortFields);

      expect(sorted).toEqual([
        { num: 4, text: 'aaa' },
        { num: 4, text: 'bbb' },
        { num: 3, text: 'aaa' },
        { num: 3, text: 'bbb' },
        { num: 2, text: 'aaa' },
        { num: 2, text: 'bbb' },
        { num: 1, text: 'aaa' },
        { num: 1, text: 'bbb' },
      ]);
    });
    it('sorts two fields desc/desc', () => {
      const sortFields = [
        { fieldName: 'text', direction: 'descending' },
        { fieldName: 'num', direction: 'descending' },
      ] as SortField[];

      const sorted = sortObjectListByFields(testList, sortFields);

      expect(sorted).toEqual([
        { num: 4, text: 'bbb' },
        { num: 4, text: 'aaa' },
        { num: 3, text: 'bbb' },
        { num: 3, text: 'aaa' },
        { num: 2, text: 'bbb' },
        { num: 2, text: 'aaa' },
        { num: 1, text: 'bbb' },
        { num: 1, text: 'aaa' },
      ]);
    });
    it('sorts two fields desc/desc reversed', () => {
      const sortFields = [
        { fieldName: 'num', direction: 'descending' },
        { fieldName: 'text', direction: 'descending' },
      ] as SortField[];

      const sorted = sortObjectListByFields(testList, sortFields);

      expect(sorted).toEqual([
        { num: 4, text: 'bbb' },
        { num: 3, text: 'bbb' },
        { num: 2, text: 'bbb' },
        { num: 1, text: 'bbb' },
        { num: 4, text: 'aaa' },
        { num: 3, text: 'aaa' },
        { num: 2, text: 'aaa' },
        { num: 1, text: 'aaa' },
      ]);
    });
    it('sorts two fields asc/desc', () => {
      const sortFields = [
        { fieldName: 'text', direction: 'ascending' },
        { fieldName: 'num', direction: 'descending' },
      ] as SortField[];

      const sorted = sortObjectListByFields(testList, sortFields);

      expect(sorted).toEqual([
        { num: 4, text: 'aaa' },
        { num: 4, text: 'bbb' },
        { num: 3, text: 'aaa' },
        { num: 3, text: 'bbb' },
        { num: 2, text: 'aaa' },
        { num: 2, text: 'bbb' },
        { num: 1, text: 'aaa' },
        { num: 1, text: 'bbb' },
      ]);
    });
    it('sorts two fields asc/desc reversed', () => {
      const sortFields = [
        { fieldName: 'num', direction: 'descending' },
        { fieldName: 'text', direction: 'ascending' },
      ] as SortField[];

      const sorted = sortObjectListByFields(testList, sortFields);

      expect(sorted).toEqual([
        { num: 4, text: 'aaa' },
        { num: 3, text: 'aaa' },
        { num: 2, text: 'aaa' },
        { num: 1, text: 'aaa' },
        { num: 4, text: 'bbb' },
        { num: 3, text: 'bbb' },
        { num: 2, text: 'bbb' },
        { num: 1, text: 'bbb' },
      ]);
    });
  });
});
