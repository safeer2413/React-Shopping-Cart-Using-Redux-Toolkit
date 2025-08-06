import { useEffect } from "react";

export const useTitle = (title) => {

  useEffect(() => {
    document.title = ` Shopping Cart | ${title}`
  }, [title]);
}