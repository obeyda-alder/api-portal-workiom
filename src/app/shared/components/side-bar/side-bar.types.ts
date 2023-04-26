export interface Lists {
  id           : string | number,
  appId        : string | number,
  name         : string,
  description  : string,
  icon        ?: string | null,
  fields      ?: {
    id     : string | number,
    listId : string | number,
    name   : string,
  },
  route        : {
      title : string,
      param ?: string | null,
      operation ?: string | null
  };
}
