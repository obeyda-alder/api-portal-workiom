export interface FieldsTable {
  field_original_name: string | null,
  field_after_translate_name ?: string | null,
  field_id: string | number;
  type: number;
  listId: string | number,
  linkedFieldId: string,
  descriotion: string,
  staticListValues ?: string[]
}
export interface PassData {
  name: string;
  title: string;
  method: string;
  text: string
}
