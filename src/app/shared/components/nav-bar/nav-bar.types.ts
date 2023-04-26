import { Lists } from '../../components/side-bar/side-bar.types'

export interface Projects {
  id    : string | number;
  icon  : string;
  name  : string;
  lists : Lists[];
}
