import { defaultItems } from "~/constants/navigations";

export function getActivePage() {
  const route = useRoute(); // route.value.name => index, login etc.

  return defaultItems.find(({ to }) => to.name === route.name);
}
