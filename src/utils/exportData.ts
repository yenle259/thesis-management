import { read, utils } from "xlsx";

export function exportData(file: File[]) {
  const reader = new FileReader();
  const dataExport = ref();

  reader.onload = () => {
    const fileData = reader.result;

    const wb = read(fileData, { type: "binary" });

    const wsname = wb.SheetNames[0];

    const ws = wb.Sheets[wsname];
    const data = utils.sheet_to_json(ws, { header: 1 });
    console.log(data);
    dataExport.value = data;
  };
  reader.readAsBinaryString(file[0]);
  return dataExport;
}
