import { useAntdTable } from "ahooks";
import { message } from "antd";

export const DefaultAntdTableConfig = {
  defaultPageSize: 10,
  loadingDelay: 500,
  onSuccess: () => message.success("加载成功"),
  onError: (e: Error) => message.error(e.message),
};
//
// export async function ListToAntdTable<T>(list: T[]) {
//   return {
//     list: list,
//     total: list.length,
//   };
// }
export const ListToAntdTable = async (task: Promise<any[]>) => {
  return async () => {
    const res = await task;
    return {
      list: res,
      total: res.length,
    };
  };
};

// todo: 删除 any
export function useAntdTableWithList<R = any, Item = any, U extends Item = any>(
  task: () => Promise<any[]>,
  config?: any
) {
  const antdConfig = useAntdTable(
    async (params) => {
      const res = await task();
      return {
        list: res,
        total: res.length,
      };
    },
    { ...DefaultAntdTableConfig, ...config }
  );
  return antdConfig;
}
