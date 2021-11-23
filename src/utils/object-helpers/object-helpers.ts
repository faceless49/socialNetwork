import { UserType } from "../../types/types";

export const updateObjectInArray = (
  items: Array<UserType>,
  itemId: number,
  objPropName: string,
  newObjProps: any
) => {
  items.map((item) => {
    // @ts-ignore
    if (u[objPropName] === itemId) {
      return { ...item, ...newObjProps };
    }
  });
};
