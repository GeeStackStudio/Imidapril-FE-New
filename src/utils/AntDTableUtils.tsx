import { SorterOrder } from "../scaffold";

export default class AntDTableUtils {
  // todo : 删除临时的 'any'
  static makeParams(params: {
    current: number;
    pageSize: number;
    sorter?: any;
    filters?: any;
  }) {
    let sorterOrder: SorterOrder | undefined = undefined;
    let sorterKey: string | undefined = undefined;
    if (params.sorter) {
      sorterOrder =
        params.sorter.order === "ascend" ? SorterOrder.Asc : SorterOrder.Desc;
      sorterKey = params.sorter.field;
    }
    return {
      pi: params.current,
      ps: params.pageSize,
      sorterKey,
      sorterOrder,
    };
  }
}
