import { Filter } from "../domain/Filters";
import { Status } from "../domain/Status";

export function mapToStatus(filter: Filter): Status | undefined {
  switch (filter) {
    case Filter.Approve:
      return Status.Approve;
    case Filter.Cancel:
      return Status.Cancel;
    case Filter.Delivery:
      return Status.Delivery;
    case Filter.Traveling:
      return Status.Traveling;

    default:
      return undefined;
  }
}
